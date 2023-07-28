mutation {
    deleteUser(id: "64c304d46b5bafa44a471ab1") {
      success
      message
      id
    }
  }

  mutation {
    editUser(id: "64c304d46b5bafa44a471ab1", name: "Jeff Zenko", address: "New Address") {
      id
      name
      address
    }
  }

  mutation {
    addUser(
      name: "Jeff User",
      username: "testuser",
      email: "testuser@example.com",
      password: "testpassword",
      address: "123 Test St",
      isGardener: false,
      isHomeowner: true
    ) {
      id
      name
      username
      email
      address
      isGardener
      isHomeowner
    }
  }
