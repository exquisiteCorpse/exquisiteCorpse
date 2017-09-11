import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFriends, fetchUsers, addFriend, deleteFriend } from '../../store'
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity } from 'react-native'
import styles from '../Style/FriendsListStyles'
import { Icon } from 'react-native-elements'

class EditFriends extends Component {
  componentDidMount () {
    if (this.props.dbUser.id) this.props.fetchData(this.props.dbUser.id)
  }

  render () {
    const { friends, users } = this.props

    let friendList
    if (friends.length && users.length) {
      friendList = users && users.map((user) => {
        //must remove this user - filter didnt work trying to figure
        return Object.assign({}, user, friends.find((friend) => { return friend.id === user.id }))
      })
    } else {
      friendList = users.filter((user) => {
        return user.id !== this.props.dbUser.id
      })
    }

    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ alignItems: 'center' }}>

          {friendList && friendList.map(friend => {
            let addRemove = <Icon
              name='minus-circle'
              type='font-awesome'
              color='black'
              onPress={() => this.props.handelOnDelete({userId: this.props.dbUser.id, friendId: friend.id})} />
            if (!friend.Friend) {
              addRemove = <Icon
                name='plus-circle'
                type='font-awesome'
                color='black'
                onPress={() => this.props.handelOnAdd({userId: this.props.dbUser.id, friendId: friend.id})} />
            }
            return (

              <View key={friend.id} style={{flex: 1, flexDirection: 'row'}}>
                <View style={{width: 150, height: 30}}>
                  <Text>{friend.username}</Text>
                </View>
                <View style={{width: 50, height: 30}}>
                  {addRemove}
                </View>
              </View>)
          })}

        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
    users: state.users,
    dbUser: state.dbUser
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: (id) => {
    dispatch(fetchFriends(+id))
      .then(() => {
        dispatch(fetchUsers())
      })
  },
  handelOnAdd: (friend) => {
    dispatch(addFriend(friend))
  },
  handelOnDelete: (friend) => {
    dispatch(deleteFriend(friend))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditFriends)