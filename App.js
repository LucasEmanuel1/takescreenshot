import React, { Component } from 'react';
import { Button, CameraRoll, Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import * as Expo from 'expo';
import { captureRef } from 'react-native-view-shot';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class App extends Component {
  state = {
    cameraRollUri: null,
  };

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA_ROLL);
  }



  render() {
    return (
      <View
        style={styles.container}
        collapsable={false}
        ref={view => {
          this._container = view;
        }}>
        <ScrollView>
          <Text style={styles.paragraph}>
            
          </Text>

          <Button title="TIRAR UMA PRINT" onPress={this._saveToCameraRollAsync} />

          {this.state.cameraRollUri &&
            <Image
              source={{ uri: this.state.cameraRollUri }}
              style={{ width: 300, height: 300 }}
              resizeMode="contain"
            />}
        </ScrollView>
      </View>
    );
  }




  _saveToCameraRollAsync = async () => {
    try {
      let result = await captureRef(this._container, {
        format: 'png',
      });

      let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
      console.log(saveResult);
      this.setState({ cameraRollUri: saveResult });
    }
    catch(snapshotError) {
      console.error(snapshotError);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'green',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
