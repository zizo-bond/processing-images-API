# About:
This API can be used as a simple placeholder API that allows to place images into the frontend with the size set via url parameters,also is used as a library 
to serve properly scaled versions of images to the frontend to decrease page loading size.

# Server Installation:
1- install npm : ```npm install```

2-Build npm: ```npm run build```

3-nodemon :```npm i -D nodemon```

4-Prettify: ```npm run prettify```

5-Run unit tests: ```npm run test```

6-Start server: ```npm run start```




# Functionality:

The server will listen on port 3000:

## Homepage endpoint:
http://localhost:3000/

## Endpoint to resize images:

http://localhost:3000/api/images

This endpoint will cause these images to the frontend to be viewed.

If a dimension is given that has all images already resized to that dimension, no futher resizing will take place. Instead, the already resized images with the appropriate dimensions will be pushed to the frontend.

if you are accessing the resizing endpoint,you should also provide the dimension that will be used to resize the images. If no parameter is provided, a warning message will be shown on the frontend.

# Resources:
   
   https://jest-bot.github.io/jest/docs/getting-started.html
   
   https://www.typescriptlang.org/

https://github.com/Eyongkevin/Udacity-Image-Processing-API#1-typescript

https://prettier.io/docs/en/options.html
    

