// Dynamic script template generator for all widgets

export function getFlashScript(side = 'right') {
  return `
<script src="https://unpkg.com/iframe-resizer@4.3.1/js/iframeResizer.min.js"></script>
<iframe id="flash-testimonial-widget" src="${window.location.origin}/flash?side=${side}" frameborder="0" scrolling="no" width="1" height="1" style="border: none;"></iframe>
<script>
  (function () {
    const iframe = document.getElementById('flash-testimonial-widget');
    function positionIframe(side = 'right') {
      const isMobile = window.innerWidth <= 768;
      Object.assign(iframe.style, {
        position: 'fixed',
        bottom: '20px',
        [side]: isMobile ? '10px' : '20px',
        zIndex: '9999',
        border: 'none',
        width: isMobile ? '280px' : '320px',
        maxWidth: 'calc(100vw - 40px)'
      });
    }
    positionIframe('${side}');
    iFrameResize({ log: false, checkOrigin: false }, iframe);
    window.addEventListener('resize', () => positionIframe('${side}'));
    window.addEventListener('message', function (event) {
      if (event.data && event.data.type === 'FLASH_POSITION') {
        positionIframe(event.data.side || '${side}');
      }
    });
  })();
</script>
`;
}

export function getFloatScript(side = 'right') {
  return `
<script src="https://unpkg.com/iframe-resizer@4.3.1/js/iframeResizer.min.js"></script>
<iframe id="float-testimonial-widget" src="${window.location.origin}/float?side=${side}" frameborder="0" scrolling="no" width="1" height="1" style="border: none;"></iframe>
<script>
  (function () {
    const iframe = document.getElementById('float-testimonial-widget');
    function positionIframe(side = 'right') {
      const isMobile = window.innerWidth <= 768;
      Object.assign(iframe.style, {
        position: 'fixed',
        bottom: '20px',
        [side]: isMobile ? '10px' : '20px',
        zIndex: '9999',
        border: 'none',
        width: isMobile ? '280px' : '400px',
        maxWidth: 'calc(100vw - 40px)'
      });
    }
    positionIframe('${side}');
    iFrameResize({ log: false, checkOrigin: false }, iframe);
    window.addEventListener('resize', () => positionIframe('${side}'));
    window.addEventListener('message', function (event) {
      if (event.data && event.data.type === 'FLOAT_POSITION') {
        positionIframe(event.data.side || '${side}');
      }
    });
  })();
</script>
`;
}

export function getWallScript() {
  return `
  <script src="https://unpkg.com/iframe-resizer@4.3.1/js/iframeResizer.min.js"></script>
  <iframe id="my-testimonial-widget" src="${window.location.origin}/wall" frameborder="0" scrolling="no" width="100%" style="border: none; display: block;"></iframe>
  <script>
    iFrameResize({ log: false, checkOrigin: false }, "#my-testimonial-widget");
  </script>
`;
}

export function getInlineSliderScript() {
  return `
<script src="https://unpkg.com/iframe-resizer@4.3.1/js/iframeResizer.min.js"></script>
<iframe id="inline-slider-widget" src="${window.location.origin}/inlineslider" frameborder="0" scrolling="no" style="border: none; width: 100%; display: block;"></iframe>
<script>
  (function () {
    const iframe = document.getElementById('inline-slider-widget');
    function positionIframe() {
      Object.assign(iframe.style, {
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        border: 'none',
        display: 'block',
      });
    }
    positionIframe();
    iFrameResize({ log: false, checkOrigin: false }, iframe);
    window.addEventListener('resize', positionIframe);
  })();
</script>
`;
}

export function getListScript() {
  return `
<script src="https://unpkg.com/iframe-resizer@4.3.1/js/iframeResizer.min.js"></script>
<iframe id="list-widget" src="${window.location.origin}/list" frameborder="0" scrolling="no" style="border: none; width: 100%; display: block;"></iframe>
<script>
  (function () {
    const iframe = document.getElementById('list-widget');
    function positionIframe() {
      Object.assign(iframe.style, {
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        border: 'none',
        display: 'block',
      });
    }
    positionIframe();
    iFrameResize({ log: false, checkOrigin: false }, iframe);
    window.addEventListener('resize', positionIframe);
  })();
</script>
`;
}

export function getGridScript() {
  return `
<script type="text/javascript" src="https://unpkg.com/iframe-resizer@4.3.1/js/iframeResizer.min.js"></script>
<iframe 
    id="grid-testimonial-widget" 
    src="${window.location.origin}/grid" 
    frameborder="0" 
    scrolling="no" 
    width="100%"
    style="border: none; display: block;">
</iframe>
<script type="text/javascript">
    iFrameResize({ log: false, checkOrigin: false }, "#grid-testimonial-widget");
</script>
`;
}

export function getReviewBlockScript() {
  return `
<script type="text/javascript" src="https://unpkg.com/iframe-resizer@4.3.1/js/iframeResizer.min.js"></script>
<iframe
    id="review-block-widget"
    src="${window.location.origin}/reviewblock"
    frameborder="0"
    scrolling="no"
    width="100%"
    style="border: none; display: block; max-width: 350px;">
</iframe>
<script type="text/javascript">
    iFrameResize({ log: false, checkOrigin: false }, "#review-block-widget");
</script>
`;
}

export function getVideoWallScript() {
  return `
<script src="https://unpkg.com/iframe-resizer@4.3.1/js/iframeResizer.min.js"></script>
<iframe id="video-wall-widget" src="${window.location.origin}/videowall" frameborder="0" scrolling="no" style="border: none; width: 100%; display: block;"></iframe>
<script>
  (function () {
    const iframe = document.getElementById('video-wall-widget');
    function positionIframe() {
      Object.assign(iframe.style, {
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        border: 'none',
        display: 'block',
      });
    }
    positionIframe();
    iFrameResize({ log: false, checkOrigin: false }, iframe);
    window.addEventListener('resize', positionIframe);
  })();
</script>
`;
}

export function getPhotosetScript() {
  return `
<script src="https://unpkg.com/iframe-resizer@4.3.1/js/iframeResizer.min.js"></script>
<iframe id="photoset-widget" src="${window.location.origin}/photoset" frameborder="0" scrolling="no" style="border: none; width: 100%; display: block;"></iframe>
<script>
  (function () {
    const iframe = document.getElementById('photoset-widget');
    function positionIframe() {
      Object.assign(iframe.style, {
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        border: 'none',
        display: 'block',
      });
    }
    positionIframe();
    iFrameResize({ log: false, checkOrigin: false }, iframe);
    window.addEventListener('resize', positionIframe);
  })();
</script>
`;
}