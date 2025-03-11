import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Blogs } from "../types";
import { motion } from "framer-motion";
import Seo from "../components/layout/Seo";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BlogDetail from "../components/blog/BlogDetail";
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
  Fab,
  Slider,
  Button,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import SpeedIcon from "@mui/icons-material/Speed";
import HeadsetIcon from "@mui/icons-material/Headset";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

interface SpeechSection {
  id: string;
  title: string;
  text: string;
  level: number;
  element?: HTMLElement;
}

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Blogs>();
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; title: string }[]
  >([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Speech-related states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [speechSections, setSpeechSections] = useState<SpeechSection[]>([]);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechVolume, setSpeechVolume] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [isAudioPlayerOpen, setIsAudioPlayerOpen] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      speechSynthRef.current = window.speechSynthesis;

      // Get available voices
      const loadVoices = () => {
        const availableVoices = speechSynthRef.current?.getVoices() || [];
        setVoices(availableVoices);

        // Select a default voice - preferably English
        if (availableVoices.length > 0) {
          const englishVoice = availableVoices.find(
            (voice) => voice.lang.includes("en-") && voice.localService
          );
          setSelectedVoice(englishVoice?.name || availableVoices[0].name);
        }
      };

      // Chrome loads voices asynchronously
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }

      loadVoices();
    }

    // Cleanup function
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      setLoading(true);
      try {
        // Fetch post data from the API
        const response = await axios.get(
          `https://unplugwell.com/blog/api/post/${slug}/`
        );
        setPost(response.data);

        // Wait for the DOM to update after the post is loaded
        setTimeout(() => {
          extractTableOfContents();
          extractSpeechSections();
        }, 800);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    // Reset speech state when slug changes
    handleStop();

    // Scroll to top when slug changes
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Cleanup function to reset state if the component unmounts or slug changes
    return () => {
      setPost({} as Blogs);
      setLoading(false);
    };
  }, [slug]);

  // Extract headings for table of contents
  const extractTableOfContents = () => {
    if (!contentRef.current) return;

    // Find all heading elements in the blog content
    const headings = contentRef.current.querySelectorAll("h2, h3");
    const toc: { id: string; title: string }[] = [];

    headings.forEach((heading, index) => {
      // Skip headings that already have IDs
      const id = heading.id || `heading-${index}`;

      // Set ID if it doesn't exist
      if (!heading.id) heading.id = id;

      toc.push({
        id,
        title: heading.textContent || `Section ${index + 1}`,
      });
    });

    setTableOfContents(toc);
  };

  // Extract sections for text-to-speech
  const extractSpeechSections = () => {
    if (!contentRef.current) return;

    const sections: SpeechSection[] = [];
    let currentSection: SpeechSection | null = null;

    // Function to add accumulated content to sections array
    const addCurrentSection = () => {
      if (currentSection && currentSection.text.trim()) {
        sections.push(currentSection);
      }
    };

    // Get all relevant elements (headings and paragraphs)
    const contentElements = contentRef.current.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, li, blockquote"
    );

    // First, add the main title
    const titleElement = contentRef.current.querySelector("h1");
    if (titleElement && titleElement.textContent) {
      sections.push({
        id: "title",
        title: "Title",
        text: titleElement.textContent,
        level: 1,
        element: titleElement as HTMLElement,
      });
    }

    // Process the rest of the content
    contentElements.forEach((element, index) => {
      const tagName = element.tagName.toLowerCase();
      const text = element.textContent || "";

      // If we encounter a heading, start a new section
      if (tagName.match(/^h[1-6]$/)) {
        // Add the previous section if it exists
        addCurrentSection();

        // Create a new section with this heading
        const headingLevel = parseInt(tagName.substring(1));
        const id = element.id || `section-${index}`;

        if (!element.id) element.id = id;

        currentSection = {
          id,
          title: text,
          text: text, // Initialize with just the heading text
          level: headingLevel,
          element: element as HTMLElement,
        };
      }
      // If it's a paragraph or list item, add to current section's content
      else if (
        currentSection &&
        (tagName === "p" || tagName === "li" || tagName === "blockquote")
      ) {
        currentSection.text += " " + text;
      }
    });

    // Add the last section if exists
    addCurrentSection();

    setSpeechSections(sections);
  };

  // Handle scroll to update reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      // Calculate reading progress
      const totalHeight = contentRef.current.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Calculate how much has been scrolled relative to the actual content
      const contentBox = contentRef.current.getBoundingClientRect();
      const contentTop = contentBox.top + scrollTop;
      const contentBottom = contentBox.bottom + scrollTop;

      // Check if we've scrolled past the start of content
      if (scrollTop < contentTop) {
        setReadingProgress(0);
        return;
      }

      // Check if we've scrolled past the end of content
      if (scrollTop + windowHeight >= contentBottom) {
        setReadingProgress(100);
        return;
      }

      // Otherwise calculate percentage through content
      const scrollableDistance = totalHeight - windowHeight;
      const scrolledDistance = scrollTop - contentTop + windowHeight;
      const progress = (scrolledDistance / scrollableDistance) * 100;

      setReadingProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [contentRef.current]);

  // Scroll to a specific heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust based on your header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Text-to-speech functions
  const handlePlay = () => {
    if (!speechSynthRef.current || speechSections.length === 0) return;

    // If already playing, pause
    if (isPlaying) {
      speechSynthRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // If paused, resume
    if (speechSynthRef.current.paused) {
      speechSynthRef.current.resume();
      setIsPlaying(true);
      return;
    }

    // Otherwise start speaking the current section
    speakSection(currentSectionIndex);
  };

  const handleStop = () => {
    if (!speechSynthRef.current) return;

    speechSynthRef.current.cancel();
    setIsPlaying(false);
    setCurrentSectionIndex(0);
  };

  const handlePrevious = () => {
    if (!speechSynthRef.current) return;

    const newIndex = Math.max(0, currentSectionIndex - 1);

    // Only change if we're moving to a different section
    if (newIndex !== currentSectionIndex) {
      speechSynthRef.current.cancel();
      setCurrentSectionIndex(newIndex);

      // If we were playing, start the new section
      if (isPlaying) {
        setTimeout(() => speakSection(newIndex), 100);
      }
    }
  };

  const handleNext = () => {
    if (!speechSynthRef.current) return;

    const newIndex = Math.min(
      speechSections.length - 1,
      currentSectionIndex + 1
    );

    // Only change if we're moving to a different section
    if (newIndex !== currentSectionIndex) {
      speechSynthRef.current.cancel();
      setCurrentSectionIndex(newIndex);

      // If we were playing, start the new section
      if (isPlaying) {
        setTimeout(() => speakSection(newIndex), 100);
      }
    }
  };

  const speakSection = (index: number) => {
    if (!speechSynthRef.current || !speechSections[index]) return;

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(speechSections[index].text);
    utteranceRef.current = utterance;

    // Set voice if selected
    if (selectedVoice) {
      const voice = voices.find((v) => v.name === selectedVoice);
      if (voice) utterance.voice = voice;
    }

    // Set other properties
    utterance.rate = speechRate;
    utterance.volume = speechVolume;

    // Handle when utterance finishes
    utterance.onend = () => {
      // Move to next section if not the last one
      if (index < speechSections.length - 1) {
        setCurrentSectionIndex(index + 1);
        speakSection(index + 1);
      } else {
        setIsPlaying(false);
        setCurrentSectionIndex(0);
      }
    };

    // Handle if utterance is stopped/interrupted
    utterance.onpause = () => setIsPlaying(false);
    utterance.onresume = () => setIsPlaying(true);

    // Highlight the current section in the content
    if (speechSections[index].element) {
      scrollToHeading(speechSections[index].id);
    }

    // Start speaking
    speechSynthRef.current.speak(utterance);
    setIsPlaying(true);
  };

  const handleRateChange = (event: Event, newValue: number | number[]) => {
    const rate = newValue as number;
    setSpeechRate(rate);

    // Update current utterance if it exists
    if (utteranceRef.current) {
      utteranceRef.current.rate = rate;
    }
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    const volume = newValue as number;
    setSpeechVolume(volume);

    // Update current utterance if it exists
    if (utteranceRef.current) {
      utteranceRef.current.volume = volume;
    }
  };

  const handleVoiceChange = (event: SelectChangeEvent) => {
    setSelectedVoice(event.target.value);

    // If currently playing, restart with new voice
    if (isPlaying && speechSynthRef.current) {
      const currentIndex = currentSectionIndex;
      speechSynthRef.current.cancel();
      setTimeout(() => speakSection(currentIndex), 100);
    }
  };

  return (
    <Layout disableContainer>
      {post && (
        <Seo
          title={post.meta_title}
          description={post.meta_description}
          canonicalUrl={`/blog/${post.slug}`}
          ogImage={post.featured_image}
          ogType="article"
        />
      )}

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          height: 3,
        }}
      >
        <LinearProgress
          variant="determinate"
          value={readingProgress}
          sx={{
            height: "100%",
            backgroundColor: "transparent",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#6366f1",
              backgroundImage: "linear-gradient(90deg, #6366f1, #ec4899)",
            },
          }}
        />
      </Box>

      {/* Floating listen button */}
      <Tooltip title="Listen to article">
        <Fab
          color="primary"
          aria-label="listen"
          onClick={() => setIsAudioPlayerOpen(!isAudioPlayerOpen)}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
            bgcolor: "#6366f1",
            "&:hover": {
              bgcolor: "#4f46e5",
            },
          }}
        >
          <HeadsetIcon />
        </Fab>
      </Tooltip>

      {/* Audio Player */}
      {isAudioPlayerOpen && (
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          elevation={3}
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: { xs: "calc(100% - 40px)", sm: 400 },
            maxWidth: "100%",
            zIndex: 1000,
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid",
            borderColor: "rgba(99, 102, 241, 0.2)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <HeadsetIcon sx={{ mr: 1, color: "#6366f1" }} />
            Listen to Article
          </Typography>

          {/* Current section info */}
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ mb: 2, fontWeight: 600 }}
          >
            {speechSections[currentSectionIndex]?.title || "Loading content..."}
          </Typography>

          {/* Controls */}
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}
          >
            <IconButton
              onClick={handlePrevious}
              disabled={currentSectionIndex <= 0 || !speechSections.length}
              color="primary"
            >
              <SkipPreviousIcon />
            </IconButton>

            <IconButton
              onClick={handlePlay}
              disabled={!speechSections.length}
              color="primary"
              sx={{
                bgcolor: "rgba(99, 102, 241, 0.1)",
                "&:hover": {
                  bgcolor: "rgba(99, 102, 241, 0.2)",
                },
              }}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            <IconButton
              onClick={handleStop}
              disabled={!isPlaying}
              color="primary"
            >
              <StopIcon />
            </IconButton>

            <IconButton
              onClick={handleNext}
              disabled={
                currentSectionIndex >= speechSections.length - 1 ||
                !speechSections.length
              }
              color="primary"
            >
              <SkipNextIcon />
            </IconButton>
          </Box>

          {/* Section progress */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="caption" sx={{ mr: 1, minWidth: 55 }}>
              Section:
            </Typography>
            <Typography variant="caption" sx={{ flexGrow: 1 }}>
              {currentSectionIndex + 1} / {speechSections.length}
            </Typography>
          </Box>

          {/* Voice selection */}
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Voice</InputLabel>
              <Select
                value={selectedVoice}
                onChange={handleVoiceChange}
                label="Voice"
                size="small"
              >
                {voices.map((voice) => (
                  <MenuItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Speed control */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <SpeedIcon sx={{ mr: 1, color: "text.secondary", fontSize: 20 }} />
            <Typography variant="caption" sx={{ mr: 1, minWidth: 45 }}>
              Speed:
            </Typography>
            <Slider
              value={speechRate}
              min={0.5}
              max={2}
              step={0.1}
              onChange={handleRateChange}
              sx={{ flexGrow: 1 }}
              size="small"
            />
            <Typography variant="caption" sx={{ ml: 1, minWidth: 25 }}>
              {speechRate}x
            </Typography>
          </Box>

          {/* Volume control */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <VolumeUpIcon
              sx={{ mr: 1, color: "text.secondary", fontSize: 20 }}
            />
            <Typography variant="caption" sx={{ mr: 1, minWidth: 45 }}>
              Volume:
            </Typography>
            <Slider
              value={speechVolume}
              min={0}
              max={1}
              step={0.1}
              onChange={handleVolumeChange}
              sx={{ flexGrow: 1 }}
              size="small"
            />
            <Typography variant="caption" sx={{ ml: 1, minWidth: 25 }}>
              {Math.round(speechVolume * 100)}%
            </Typography>
          </Box>
        </Paper>
      )}

      <Container maxWidth="xl" sx={{ pt: 4, pb: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Table of Contents - for tablet and desktop */}
          {!isMobile &&
            (tableOfContents.length > 0 || speechSections.length > 0) && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                sx={{ width: 280, flexShrink: 0 }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    position: "sticky",
                    top: 100,
                    p: 3,
                    borderRadius: 2,
                    bgcolor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid",
                    borderColor: "rgba(99, 102, 241, 0.2)",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Table of Contents
                  </Typography>

                  <List dense disablePadding>
                    {tableOfContents.map((heading) => (
                      <ListItem
                        key={heading.id}
                        onClick={() => scrollToHeading(heading.id)}
                        sx={{
                          borderRadius: 1,
                          mb: 0.5,
                          "&:hover": {
                            bgcolor: "rgba(0, 0, 0, 0.04)",
                          },
                        }}
                      >
                        <ArrowRightIcon
                          fontSize="small"
                          sx={{
                            color: "#6366f1",
                            mr: 1,
                          }}
                        />
                        <ListItemText
                          primary={heading.title}
                          primaryTypographyProps={{
                            variant: "body2",
                            sx: {
                              fontWeight: 500,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  {/* Audio controls in sidebar */}
                  <Typography
                    variant="subtitle2"
                    sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                  >
                    <HeadsetIcon
                      sx={{ fontSize: 18, mr: 1, color: "#6366f1" }}
                    />
                    Listen to Article
                  </Typography>

                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    onClick={handlePlay}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    {isPlaying ? "Pause" : "Play"}
                  </Button>

                  <Box
                    sx={{
                      mt: 2,
                      pt: 2,
                      borderTop: "1px solid",
                      borderColor: "rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Reading progress: {Math.round(readingProgress)}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={readingProgress}
                      sx={{
                        mt: 1,
                        height: 6,
                        borderRadius: 3,
                        bgcolor: "rgba(0, 0, 0, 0.05)",
                        "& .MuiLinearProgress-bar": {
                          bgcolor: "#6366f1",
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                </Paper>
              </Box>
            )}
          <Box ref={contentRef} sx={{ flex: 1 }}>
            {post && <BlogDetail post={post} loading={loading} />}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default BlogDetailPage;
