<form
  action="https://formspree.io/f/xyzengyo"  method="POST"
>
  <label>
    Your email:
    <input type="email" name="email">
  </label>
  <label>
    Your message:
    <textarea name="message"></textarea>
  </label>
  <!-- your other form fields go here -->
  <button type="submit">Send</button>
</form>

 Option 2: Load the footer dynamically with JavaScript
If you're using plain JavaScript, you can create a separate footer.html file and then load it into your pages like this:

📁 File structure:

/index.html
/about.html
/js/footer.js
/partials/footer.html

✅ In footer.html:

<footer>
  <!-- your full footer code -->
</footer>
✅ In footer.js:

fetch('/partials/footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });
✅ In each page (index.html, about.html, etc):

<body>
  <!-- page content -->

  <div id="footer-placeholder"></div>
  <script src="/js/footer.js"></script>
</body>
✅ Pros: Only one place to update your footer
✅ Works even with plain HTML
❌ Requires JS to be enabled in the browser

