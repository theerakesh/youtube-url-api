const youtubedl = require('youtube-dl-exec')
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.status(200).json({ message: "Server is working" })
})

app.post('/youtube', async (req, res) => {
  // if (!req.body) {
  //   res.status(404).json({ message: "body is empty" })
  //   return;
  // }
  const { yurl, quality } = req.body;

  if (!yurl) {
    res.status(404).json({ message: "yurl is must" })
  }
  if (!quality) {
    res.status(404).json({ message: "quality is must(360 or 720)" })
  }
  const vidQuality = quality == '360' ? 18 : 22;

  const vidUrl = await youtubedl(yurl, {
    getUrl: true,
    format: vidQuality,
    referer: 'https://www.youtube.com'
  })
  if (vidUrl) {
    res.status(200).json({ url: vidUrl })
  } else {
    res.status(500).json({ message: "Server Error" })
  }

})

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})


