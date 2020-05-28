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

// Value stored in context.user
// {
//   facebookID: '10923840981234',
//   _id: '4',
//   username: 'jk.jewik',
//   displayName: 'JSON Jewik',
//   lastLoggedIn: new Date(),
//   friends: [
//     { name: 'Ethan Shabhazian', id: '10934802384' },
//     { name: 'Yunfan Zhong', id: '05829340239' }
//   ]
// }

const UserContext = React.createContext(null)

export default UserContext
