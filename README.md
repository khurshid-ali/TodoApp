# TodoApp

### cloning the repository 
to clone the repository issue the following command 

`git clone https://github.com/khurshid-ali/TodoApp.git`

Once the repository is cloned, the code will be cloned in the TodoApp subdirectory. 

### Running the application in Development Mode

Afte cloning the repo. Change directory to TodoApp directory. This directory will contain the `TodoApp.Sln`

issue the following command to run the application. 

`dotnet run --project Src/TodoApp.Web/TodoApp.Web.csproj`

The todo application will be listening on the port 5228 on localhost so redirect your browser to 

[http://localhost:5228](http://localhost:5228)

The todo app should load up. 

### Running the application in Release mode 

Afte cloning the repo. Change directory to TodoApp directory. This directory will contain the `TodoApp.Sln`

Issue the following command to build the app and put all into the `build` subfolder. 

`dotnet publish -o build -c Release`

change directory into the build folder

`cd build`

Run the application by issueing the command 

`dotnet TodoApp.Web.dll`

The application will be running in the url 
[https://localhost:5001](https://localhost:5001)


### Requirements

We would like you to create a production-level to-do application using the framework of your choice. The to-do application should be capable of the following functions:

- List Todo Items
- Add a Todo item
- Update a Todo item
- Delete Todo Item
- Mark Item as Completed

You can use in-memory storage or a local database to persist all to-do items. Please use both front and back-end technologies of your choice to complete this challenge

Kindly complete this test in the next 5 days. Once completed, make sure to create a public repository for this project and provide us with the link. In case you are not using any source control, feel free to send the project via email.