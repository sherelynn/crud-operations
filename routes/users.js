const express = require("express")
const router = express.Router()

let users = [
  {
    firstName: "John",
    lastName: "Wick",
    email: "johnwick@gamil.com",
    DOB: "22-01-1990",
  },
  {
    firstName: "John",
    lastName: "Smith",
    email: "johnsmith@gamil.com",
    DOB: "21-07-1983",
  },
  {
    firstName: "Joyal",
    lastName: "White",
    email: "joyalwhite@gamil.com",
    DOB: "21-03-1989",
  },
]

// ========== GET ALL USERS ========== //

// R in CRUD stands for retrieve
// GET request: Retrieve all users
// http://localhost:4000/user -> browser
// curl localhost:4000/user -> console
router.get("/", (req, res) => {
  res.send(JSON.stringify({ users }, null, 4))
})

// ========== GET A SPECIFIC USER BY EMAIL ========== //

// Create a GET by specific email method
// GET by specific ID request: Retrieve a single user with email ID
// Example email from users data: johnwick@gamil.com
// http://localhost:4000/user/johnwick@gamil.com -> browser
// curl localhost:4000/user/johnwick@gamil.com -> console
router.get("/:email", (req, res) => {
  // Extract the email parameter from the request URL
  // const email = req.params.email
  const { email } = req.params // using destructuring

  // Filter the users array to find users whose email matches the extracted email parameter
  const filtered_users = users.filter(user => user.email === email)

  // Send the filtered_users array as the response to the client
  res.send(filtered_users)
})

// ========== CREATE A NEW USER ========== //

// C in CRUD stands for Create
// POST request: Create a new user
// curl --request POST 'localhost:4000/user?firstName=Jon&lastName=Lovato&email=jonlovato@theworld.com&DOB=10/10/1995'
// To verify if it has been added: curl localhost:4000/user/jonlovato@theworld.com
// Output: [{"firstName":"Jon","lastName":"Lovato","email":"jonlovato@theworld.com","DOB":"10/10/1995"}]
router.post("/", (req, res) => {
  console.log(req.query)
  // Output:
  // {  firstName: 'Jon',
  //   lastName: 'Lovato',
  //   email: 'jonlovato@theworld.com',
  //   DOB: '10/10/1995'
  // }}

  // Push a new user object into the users array based on query parameters from the request
  users.push({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    email: req.query.email,
    DOB: req.query.DOB,
  })

  // Send a success message as the response, indicating the user has been added
  res.send(`The user ${req.query.firstName} has been added`)
})

// ========== UPDATE A USER ========== //

// U IN CRUD stands for update and can be achieved by using the PUT method
// PUT request: Update the details of a user by email ID
// Update the DOB
// http:localhost:4000/user/johnsmith@gamil.com?DOB=1/1/1971
// curl --request PUT 'localhost:4000/user/johnsmith@gamil.com?DOB=1/1/1971'
// To verify -> curl localhost:4000/user/johnsmith@gamil.com
// localhost:4000/user -> the user's DOB should be updated as well in the browser
router.put("/:email", (req, res) => {
  // Extract the email parameter and find users with matching email
  const { email } = req.params
  let filtered_users = users.filter(user => user.email === email)

  if (filtered_users.length > 0) {
    // Select the first matching user and update attributes if provided
    let filtered_user = filtered_users[0]

    // Extract and update DOB if provided

    let DOB = req.query.DOB
    if (DOB) {
      filtered_user.DOB = DOB
    }

    // Include similar code here for updating other attributes as needed

    // Replace old user entry with updated user
    users = users.filter(user => user.email !== email)
    users.push(filtered_user)

    // Send success message indicating the user has been updated
    res.send(`User with the email ${email} updated.`)
  } else {
    // Send error message if no user found
    res.send(`Unable to find user!`)
  }
})

// ========== DELETING A USER ========== //

// D in CRUD stands for delete
// DELETE request: Delete a user by email ID
// curl --request DELETE 'localhost:4000/user/johnsmith@gamil.com'
// sending a request with that user will be null
// localhost:4000/user -> that user will not be included in the list
router.delete("/:email", (req, res) => {
  // Extract the email parameter from the request URL
  const email = req.params.email

  // Filter the users array to exclude the user with the specified email
  users = users.filter(user => user.email != email)

  // Send a success message as the response, indicating the user has been deleted
  res.send(`User with the email ${email} deleted.`)
})

module.exports = router
