<!DOCTYPE html>
<html>
<head>
  <title>AI Joke Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="text-align:center; font-family:Arial; padding:40px;">

  <h1>AI Joke Generator</h1>

  <button onclick="getJoke()" style="padding:10px 20px;">
    Get Joke
  </button>

  <p id="joke" style="margin-top:30px; font-size:18px;">
    Click to see a joke!
  </p>

  <script>
    function getJoke() {
      fetch("https://official-joke-api.appspot.com/random_joke")
        .then(response => response.json())
        .then(data => {
          document.getElementById("joke").innerText =
            data.setup + " - " + data.punchline;
        });
    }
  </script>

</body>
</html>
