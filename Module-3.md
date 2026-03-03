<!DOCTYPE html>
<html>
<head>
  <title>AI Motivation Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="text-align:center; font-family:Arial; padding:40px;">

  <h1>AI Motivation Generator</h1>

  <button onclick="getAdvice()" style="padding:10px 20px;">
    Get Motivation
  </button>

  <p id="result" style="margin-top:30px; font-size:18px;">
    Click the button to get motivation!
  </p>

  <script>
    function getAdvice() {
      fetch("https://api.adviceslip.com/advice")
        .then(response => response.json())
        .then(data => {
          document.getElementById("result").innerText =
            data.slip.advice;
        });
    }
  </script>

</body>
</html>
