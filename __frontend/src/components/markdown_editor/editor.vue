<template>
  <link rel="stylesheet" href="./editor.css" />
  <form>
    <textarea name="test" id="contenu" cols="30" rows="10"></textarea>
  </form>
</template>

<script src='./editor.js'></script>
<script>
window.onload = function () {
  new SimpleMDE({
    autofocus: true,
    element: document.getElementById("contenu"),
    toolbar: [
      {
        name: "bold",
        action: SimpleMDE.toggleBold,
        className: "fa fa-bold", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      {
        name: "italic",
        action: SimpleMDE.toggleItalic,
        className: "fa fa-italic", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      {
        name: "strikethrough",
        action: SimpleMDE.toggleStrikethrough,
        className: "fa fa-strikethrough", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      {
        name: "heading",
        action: SimpleMDE.toggleHeadingSmaller,
        className: "fa fa-header", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      "|",
      {
        name: "code",
        action: SimpleMDE.toggleCodeBlock,
        className: "fa fa-code", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      {
        name: "quote",
        action: SimpleMDE.toggleBlockquote,
        className: "fa fa-quote-left", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      "|",
      {
        name: "unordered-list",
        action: SimpleMDE.toggleUnorderedList,
        className: "fa fa-list-ul", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      {
        name: "ordered-list",
        action: SimpleMDE.toggleOrderedList,
        className: "fa fa-list-ol", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      {
        name: "link",
        action: SimpleMDE.drawLink,
        className: "fa fa-link", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      {
        name: "image",
        action: SimpleMDE.drawImage,
        className: "fa fa-image", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      {
        name: "table",
        action: SimpleMDE.drawTable,
        className: "fa fa-table", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      {
        name: "horizontal-rule",
        action: SimpleMDE.drawHorizontalRule,
        className: "fa fa-minus", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      {
        name: "preview",
        action: SimpleMDE.togglePreview,
        className: "fa fa-eye no-disable", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      {
        name: "side-by-side",
        action: SimpleMDE.toggleSideBySide,
        className: "fa fa-columns no-disable no-mobile", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
      {
        name: "fullscreen",
        action: SimpleMDE.toggleFullScreen,
        className: "fa fa-arrows-alt no-disable no-mobile", // Look for a suitable icon
        title: "Red text (Ctrl/Cmd-Alt-R)",
      },
    ],
  });
};
</script>
