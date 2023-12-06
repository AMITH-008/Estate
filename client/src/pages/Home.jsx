import React from 'react'

const Home = () => {
  return (
    <div className='py-4 px-2 rounded-xl h-screen  max-w-2xl mx-auto my-2'>
      <h1 className='font-bold text-3xl mb-4 underline'>Welcome to my Authentication App</h1>
      <h2 className='text-2xl font-semibold mb-2'>Title: Building Secure Authentication with React, Express, and MongoDB</h2>
      <p>
        In this comprehensive web project, I've developed a robust authentication system utilizing React for the frontend, Express for the backend, and MongoDB for the database.
      </p>
      <h3 className='text-2xl font-semibold mb-2 mt-2'>
        Backend Implementation with Express:
      </h3>
      <p>
        The backend infrastructure is powered by Express, a flexible and minimalistic Node.js framework. Leveraging Express, I've established a secure server-side environment, enabling robust API endpoints and handling various authentication processes efficiently.
      </p>
      <h3 className='text-2xl font-semibold mt-2 mb-2'>
      Database Management using MongoDB:
      </h3>
      <p>
        For data storage and management, MongoDB—a NoSQL database—has been employed. Its flexibility and scalability perfectly suit the requirements of the authentication system. MongoDB allows for seamless integration with Express, enabling efficient storage and retrieval of user authentication-related information.      
      </p>
      <h3 className='text-2xl font-semibold mt-2 mb-2'>
        REST API Implementation:
      </h3>
      <p>
        The frontend of the application is crafted using React, a powerful JavaScript library known for its efficiency and reusability in building user interfaces. Leveraging React, I've designed an intuitive and responsive user interface that ensures a seamless experience for users interacting with the authentication system.
      </p>
      <h3 className='text-2xl font-semibold mt-2 mb-2'>
        Frontend Development with React:
      </h3>
      <p>
        The communication between the frontend and backend is facilitated through a RESTful API architecture. This design ensures a standardized and efficient exchange of data, enabling secure login, registration, and other authentication-related functionalities.      
      </p>
    </div>
  )
}

export default Home;