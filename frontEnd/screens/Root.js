/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Footer, FooterTab, Button, Icon, Container} from 'native-base';
import CreateStaff from './CreateStaff';
import StaffAttendance from './StaffAttendance';

class Root extends Component {
  state = {
    showCreateStaff : true,
    showAttendance : false
  };

  onClickStaff = () =>{
    console.log(`.>>>>>>>>>>>>>>>>>>>>>>>>>>.onclickStaff`)
    this.setState({
      showCreateStaff : true,
      showAttendance : false
    });
  };
  onClickAttendance = () =>{
    console.log(`.>>>>>>>>>>>>>>>>>>>>>>>>>>.onclickAttendance`)
    this.setState({
      showCreateStaff : false,
      showAttendance : true
    })
  }
  render() {
    return (
        <Container>
          {
            this.state.showCreateStaff && <CreateStaff />
          }
          {
            this.state.showAttendance && <StaffAttendance/>
          }
          <Footer>
            <FooterTab>
              <Button
                  onPress={() => this.onClickStaff()}
              >
                <Icon name='people'/>
                <Text>Staff</Text>
              </Button>
              <Button
                  onPress={() => this.onClickAttendance()}
              >
                <Icon name='time'/>
                <Text>Attendance</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
    );
  }
};

export default Root;
