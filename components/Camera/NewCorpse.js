import React, { Component } from 'react'
import { View, Image, Text, Button, StyleSheet, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import { getPhoto } from '../../store'
import Orientation from 'react-native-orientation'

class NewCorpse extends Component {
  componentDidMount () {
    this.props.fetchPhoto()
    console.log(this.props)
  }

  componentWillUnmount () {
    // remove lock
    Orientation.unlockAllOrientations()
  }

  render () {
    const navigate = this.props.navigation.navigate

    return (
      <View style={{display: 'flex'}}>
        <Image
          style={{height: '65%', width: '100%'}}
          source={{ uri: this.props.singlePhoto.path }}
          resizeMode={'contain'}
        />
        <View
          style={{height: '35%'}}>
          <View style={{flexGrow: 1}} />
          <Button
            title='Approve'
            color='#228b22'
            onPress={() => {
              navigate('SendToFriendsScreen')
            }}
          />
          <Button
            title='Re-take'
            color="#ff0000"
            onPress={() => {
              navigate('AppCameraScreen')
            }}
          />
        </View>

      </View>
    )
  }
}


const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  image: {
    width: deviceWidth,
    height: '35%'
  }
})

const mapStateToProps = (state) => {
  return {
    singlePhoto: state.singlePhoto
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPhoto: () => {
    dispatch(getPhoto())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewCorpse)