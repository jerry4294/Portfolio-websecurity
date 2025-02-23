Overview

Name-  Portfolio-Jashanjeet

This is a web app built with Express.js that will be used to show my portfolio and blog posts. It hosts static files, uses caching mechanisms, and is protected with HTTPS and HTTP headers.

Lessons Learned

1. Cache Control
I had a hard time integrating  cache for various routes to achieve a balance between performance and data freshness. I utilized the setCache middleware to forward Cache-Control headers with specific times for different routes. Blog articles, for example, are cached for 5 minutes to reduce server load without affecting content freshness.This helped me to  improved response speeds and got rid of redundant server requests. 

2. Incorporating Helmet
Challenge: For protecting the application from common web vulnerabilities I had to integrate helmet which I never used which was completely new experience for me. Any how I included the helmet middleware to set a number of HTTP headers to enhance security, such as Content-Security-Policy and X-Frame-Options.This addition strengthened  the security position of the website. However, setting these headers  with care not to block valid content or functionality accidentally was really hard to implement.

3. Implementing and Configuring HTTPS
To ensure safe data transmission from client to server I had to implement https which was again first time for me so was a bit hard. I deployed the application running over HTTPS in production by loading SSL certificate files and starting an HTTPS server. The setup made the data safer. However, handling SSL certificates and keeping them up to date made the deployment process more complex.

4. Frontend development. 
This was the first time I had made anything using express js and node js , I could have used vanilla html just to learn something new I tried this, not successful maybe but still I learned a lot about express and node. For sure there is much more about them that I still need to learn.


SSL configuration


In my Express.js application, I have turned on SSL configuration and security headers to enable secure communication and avoid typical web vulnerabilities. Here is how I set up SSL and security headers:
1. SSL Configuration:
To make my website work on HTTPS, I set up an HTTPS  using Node.js https module. By doing this , it would ensure that information passed between the server and client is encrypted.
Steps:
1.Get SSL Certificates:  For development, I had used self-signed certificates, but for production, it's important to use certificates from a well-known CA.
 Command for terminal
 openssl req -nodes -new -x509 -keyout server.key -out server.cert
2. Set Up HTTPS Server: I created an HTTPS server by reading SSL certificate files and passing them to the https.createServer() method with my Express app.
3. Start the Server: I configured the server to listen on the desired port (443 for HTTPS) and initiated it.

Open SSL reflection

I decided to use OpenSSL to create a self-signed certificate in order to incorporate SSL in my Express.js application. By using this method, I can offer my application over HTTPS, guaranteeing safe client-server connection. The command-line tools provided by OpenSSL, a simple and well-documented technique for configuring SSL in Node.js apps, are how I created the certificate. Environments used for testing and development benefit greatly from this approach.



HTTP Header reflection

1. CSP (Content Security Policy):
CSP is an effective HTTP header that guards against a number of threats, including data injection. CSP prevents resources from untrusted sites from loading in the browser by defining authorized content sources. Configuring CSP, on my website will only let content from my domain. This guarantees that dangerous scripts or styles from outside sources will be prevented, protecting my users from potential dangers.

2. X-Frame-Options:
The X-Frame-Options header prevents clickjacking attacks by limiting the ability of my  website's pages to be included in frames or iframes on other websites. My  content would not be framed because I set this header to DENY. This would prevent malicious websites from embedding my pages and misleading users into interacting with hidden elements. 


There were a number of difficulties with configuring HTTPS and incorporating Helmet into my Express.js application.  This is how I responded to them: 

Reflections

 1. Setting up HTTPS:

The installation and acquisition of SSL/TLS certificates presented some difficulties.    It took considerable consideration to understand the differences between self-signed and CA-signed certificates and make sure they were configured correctly.I made sure my Express.js server was configured correctly by following thorough instructions on creating and installing SSL certificates through YouTube videos. 

2. Helmet Middleware Integration: 
When I integrated the Helmet middleware into my website,I found that certain external resources, such as scripts and styles from content delivery networks, were being blocked due to Helmet's extremely strict default Content Security Policy, which only permits resources from the same origin.In order to accept the required external sources, I modified Helmet's settings by include them in the CSP directives. By allowing necessary resources while preserving defence against harmful material, I made balance between security and functionality. had a hard time but eventually was able to do it sing a lot of YouTube. 

1. Caching Strategy:  
a. Cache-Control Headers: I direct the caching of responses using the Cache-Control header. Cache-Control: public, max-age=300, for instance, indicates that the response will be cached for five minutes.
b. Static Assets: In order to minimize server load and accelerate page loads, I setup longer cache durations for static files such as photos and stylesheets.
c. Dynamic Content: In order to guarantee that consumers receive the most recent information, I employed lower cache time for dynamic content, such as blog entries.
