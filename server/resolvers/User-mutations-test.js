mutation {
    deleteUser(id: "64c304d46b5bafa44a471ab1") {
      success
      message
      id
    }
  }

  mutation {
    editUser(id: "64c44cb62339107f90dbd01d", firstName: "Jeffff", address: "New Address") {
      id
      firstName
      address
    }
  }

  mutation {
    addUser(
      firstName: "Jeff",
      lastName: "Zenko",
      username: "affdfnd444444",
      email: "tteesssssssttt@example.com",
      password: "Test$411"
    ) {
      token
      user {
        id
        firstName
        lastName
        username
        email
      }
    }
  }

