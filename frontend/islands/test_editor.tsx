import Quill from "quill";
import { render, Component } from "preact";
import "quill/dist/quill.snow.css"; 
import 'quill-toolbar/dist/quill-toolbar.css'; // Import the Quill Toolbar CSS
import { Toolbar } from 'quill-toolbar';

document.addEventListener('DOMContentLoaded', () => {
  const editorContainer = document.getElementById('editor');
  if (!editorContainer) {
    console.error('Editor container not found.');
    return;
  }

  var toolbarOptions = [
   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
   ['blockquote', 'code-block'],
 
   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
   [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
   [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
   [{ 'direction': 'rtl' }],                         // text direction
 
   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
 
   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
   [{ 'font': [] }],
   [{ 'align': [] }],
 
   ['clean']                                         // remove formatting button
 ];

  const editor = new Quill(editorContainer, {
   modules: {
      toolbar: toolbarOptions
   },
    theme: 'snow',
  });
});

Quill.on('text-change', (delta, oldDelta, source) => {
   if (source === 'user') {
      // Add code for change in database
     console.log('Text changed by the user:', delta);
   }

   Quill.on('selection-change', (range, oldRange, source) => {
      // Add code for change in database
      console.log('Selection changed:', range);
    });
  });