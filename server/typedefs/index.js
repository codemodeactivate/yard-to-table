const { gql } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');

// read the graphql files from the typedefs folder
// this setup will allow us to add more typedefs later when needed without having to modify this file :)
const typedefsArray = fs
  .readdirSync(__dirname, { withFileTypes: true })
  .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.graphql'))
  .map ((dirent) => {
    const schema = fs.readFileSync(path.join(__dirname, dirent.name), {
      encoding: 'utf8',
    });
    return gql(schema);
  });

const typeDefs = gql`
    ${typedefsArray.join(' ')}
`;

module.exports = typeDefs;
