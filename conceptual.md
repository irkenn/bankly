### Conceptual Exercise

Answer the following questions below:

- What is a JWT?

JWT stands for JSON Web Token. The main goal of the JWT's is to add state and security to the HTTP. The JWT contains crucial information about the user that helps to determine the behavior of the app depending on the authentication and permissions granted to the user. All this information is contained in different parts of the JWT, including information about the server as well. A JWT consists of three main parts, all of them are encoded in base 64 and also encrypted.

- What is the signature portion of the JWT?  What does it do?
The signature is the last of the three portions of the JWT. It combines the first two (the header and the payload) and hashes them with a server secret key. This way ensures that the JWT cannot be altered by the user or any other third party.

- If a JWT is intercepted, can the attacker see what's inside the payload?
The attacker will be able to see the payload of the JWT, which is encoded, not encrypted. But it won’t be able to do much about the signature of the JWT, since it will need the secret key, which is stored and protected in the server to authenticate the Token.

- How can you implement authentication with a JWT?  Describe how it works at a high level.

The first step to implement JWT’s as a way of authentication and data transfer is done with the help of a node module called ‘jsonwebtoken’. Storing the secret key used to encrypt and authenticate the JWT is one of the main concerns when implementing JWT authentication. This has to be done in a separate module which calls an environment variable that is set directly in the server environment. Once those steps are met, the implementation relies on signing a token with the required parameter using ‘jwt.sign()’ and decoding or verifying them using ‘jwt.decode()’ and ‘jwt.verify()’ respectively. The JWT is usually sent in the headers and can be accessed using the request parameters.

- Compare and contrast unit, integration and end-to-end tests.

Test usually start with evaluating a single unit. These units can be of a very complicated nature but in this case its functioning will be tested in isolation. This will typically test functions by themselves and it is the first step into testing the functioning of a process. 
From here, the following step is the integration test, which adds complexity and as the name implies interacts often with other units for a more sophisticated testing. This level of testing usually tests the outcome of route handlers that process requests with the use authentication database manipulation error handling and evaluates the responses received from the server. The next level of integration is end-to-end tests. In this case everything about the application is tested at once, from the appearance and UI in the front-end, to the processing of the requests, authentication, data manipulation, database manipulation and eventual response by the backend. This is the highest degree of testing, in its complexity, broadness and relevance. Only after the first two levels of testing are completely met it is advisable to test with this degree of complexity.

- What is a mock? What are some things you would mock?

A mock is a resource usually reserved when the developer needs to test a function that interacts with a third party API or any kind of resource or process that it’s outside of the developers control. So a mock simulates the behavior of those resources

- What is continuous integration?

Continuos integration is the practice of merging in small code changes frequently rather than waiting for a series of changes to accumulate and merging them at the end of a development cycle. It stands for the strategy of having smaller and continuous increments, rather that big chunks of code every once. In this case it is important to rely on tests that could reject deployments of the code if they don’t pass all the required tests. This can also notify the developer about the failures in the deployment. This is usually reserver to other paid tool that facilitate this process.

- What is an environment variable and what are they used for?

Node environment variables are used to protect sensitive data, like the secret key used for the JWT’s validation of encrypted data. They are declared directly in the environment where the app resides so they can’t be accessed by looking at the base code of the server, for example and thus this provides extra layers of security.

- What is TDD? What are some benefits and drawbacks?

TDD stands for Test Driven Development. The idea behind this concept is that in a process of development of functionalities the test are written first. Those test will seek for the requirements and deal with some prospected edge cases, so the developer will write code that conforms with those tests. This way of development has several advantages, as all the guidelines like modularity, coverage, collaboration, architectural decision and documentation among others are already implied in the tests. 

- What is the value of using JSONSchema for validation?

It’s a simple way of comparing the received info with what should be expected and proceed only if those expectations are met. Using JSON schema for validation saves the developer from writing functions with many conditionals that check that the passed parameters by the user comply with the parameters that are required for a function to perform successfully.

- What are some ways to decide which code to test?

Test are a vital part of software development and in a perfect scenario all functionalities should be tested, at least broadly. The first step is to decide how deep the analysis should be. Is it already a complete application? Is it in the process of development and some functionalities need to be tested? Are new functionalities going to be tested? Overall the best approach I think a developer should have while testing is to test simple functionalities first, prioritizing the most crucial things and then as the requirements are met the testing should cover more ground and test more integrated features as it moves towards testing on an end-to-end scope. I other cases the tester might not be in charge of the development of the application, in some cases the code base was done by a third party, so end-to-end tests might be the best approach in this case.

- What does `RETURNING` do in SQL? When would you use it?

The RETURNING clause in SQL specifies which columns should be returned after updating or deleting the specified column/rows in the database.

- What are some differences between Web Sockets and HTTP?

Web sockets is a less resource intensive way of transferring data from a server to a client. In a typical HTTP a connection is created and then terminated between the server and the user every time a request/respond cycle is done. Using Web Sockets Once the authentication/verification is done, the server and the user the connection will be maintained for a defined (or not) amount of time. Both the server and the user can generate requests and responses independently and immediately, thereby this communication protocol is faster and less demanding on the server side.

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?

I like Flask because Python is a very synthetic language, that has particular tools and logic that are quite handy. JavaScript sometimes might be perceived as a bit more cumbersome, because of its punctuation and synchronicity, and while I prefer a bit more to write code on Python I think Express is a much sturdier and a full-featured framework than Flask. I’m sure there are many implementations in Flask that can be as powerful as their Express equivalent, but one thing that boggled a lot while developing in Flask is that I was working with many dependencies that were incompatible with each other. By updating to a newer version of one dependency I could create an error in another one that wouldn’t support the upgrase and so. I haven’t encounter that problem with Express yet and besides of that I like a lot the modularity of Express with the use of middleware and specific files, schemas, error handling, validation, authentication and also testing with Jest is very intuitive and even fun.
