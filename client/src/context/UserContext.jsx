import React from 'react'

// Read up on React Context here: https://reactjs.org/docs/context.html
// Provides an easy way of sharing the user data across the app without having
// to pass everything down 5+ layers of props.

// Example consumer usage:
// function ShowDaUserID() {
//   return (
//     <View>
//       <UserContext.Consumer>
//         {(context) => <Text> {context.user.id}</Text>}
//       </UserContext.Consumer>
//     </View>
//   )
// }
const UserContext = React.createContext(null)

export default UserContext
