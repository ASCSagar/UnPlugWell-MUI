import React, { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "//www.highperformanceformat.com/cb1bded69341ca2635e4a2696a2e83b4/invoke.js";

    document.getElementById("ad-container").appendChild(script);
  }, []);

  return (
    <div id="ad-container">
      <script type="text/javascript">
        {`
          atOptions = {
            'key': 'cb1bded69341ca2635e4a2696a2e83b4',
            'format': 'iframe',
            'height': 250,
            'width': 300,
            'params': {}
          };
        `}
      </script>
    </div>
  );
};

export default GoogleAd;
