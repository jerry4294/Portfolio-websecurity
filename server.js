const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files and security middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'"]
    }
  })
);
app.use(helmet.frameguard({ action: 'deny' }));

// Cache control middleware
const setCache = (duration, swr) => (req, res, next) => {
  let headerValue = `public, max-age=${duration}`;
  if (swr) headerValue += `, stale-while-revalidate=${swr}`;
  res.set('Cache-Control', headerValue);
  next();
};

// Portfolio data
const data = {
  title: 'Jashanjeet Singh - Portfolio',
  profile: {
    name: 'Jashanjeet Singh',
    bio: 'Hi, I’m Jerry, a passionate web developer who focuses more on the functionality and performance of websites rather than design. With a strong foundation in HTML, CSS, and JavaScript, I enjoy building clean, efficient, and interactive websites. While many find joy in designing visually stunning pages, I thrive in the development side—making sure everything works smoothly behind the scenes.',
    image: '/images/profile.jpg'
  },
  technologies: ['JavaScript', 'Node.js', 'Express.js', 'HTML', 'CSS'],
  projects: [
    {
      name: 'Roop Properties',
      description: 'This is a website for ROOP PROPERTIES, I created this using basic HTML, CSS, and JavaScript. It features a simple and clean design to showcase various room listings. Users can browse different properties with essential details like size, price, and location. The website responsive layout ensures that it works well on both desktop and mobile devices.',
      github: 'https://github.com/jerry4294/portfolio2.git',
      demo: 'https://jerry4294.github.io/portfolio2/'
    },
    {
      name: 'Maharaja Indian Restaurant',
      description: 'Welcome to Maharajah, a delightful online experience for exploring authentic Indian cuisine. This website was built using basic HTML, CSS, and JavaScript to showcase our menu, ambiance, and special offerings. Browse through our variety of dishes, including traditional favorites and chef specials, all displayed in an easy-to-navigate layout.',
      github: 'https://github.com/jerry4294/Final-assignment.git',
      demo: 'https://jerry4294.github.io/Final-assignment/'
    }
  ],
  blogPosts: [
    {
      id: 1,
      title: 'Common Web Development Technologies',
      summary: 'Web development is comprised of three essential elements: JavaScript (for interactivity), CSS (for styling), and HTML (for structure). Even while design is a big part of the process, I am more interested in the backend processes. JavaScript provides the dynamic features that allow webpages to be interactive, while HTML arranges the content and CSS makes it look visually pleasing.',
      link: '/blog/common-technologies'
    },
    {
      id: 2,
      title: 'Backend Security Best Practices',
      summary: 'Securing Node.js applications...',
      link: '/blog/security-best-practices'
    }
  ]
};

// Core routes
app.get('/', (req, res) => {
  res.render('index', data);
});

app.get('/posts', setCache(300, 60), (req, res) => {
  res.json(data.blogPosts);
});

app.get('/posts/:id', setCache(300), (req, res) => {
  const postId = parseInt(req.params.id);
  const post = data.blogPosts.find(p => p.id === postId);
  post ? res.json(post) : res.status(404).json({ error: 'Post not found' });
});

app.get('/projects', setCache(300), (req, res) => {
  res.json(data.projects);
});

app.get('/technologies', setCache(300), (req, res) => {
  res.json(data.technologies);
});

app.get('/profile', setCache(300), (req, res) => {
  res.json(data.profile);
});

// Server configuration
const isHTTPS = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || (isHTTPS ? 443 : 3000);

if (isHTTPS) {
  const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt'))
  };
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Secure server running on https://localhost:${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}