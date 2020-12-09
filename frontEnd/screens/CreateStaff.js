/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
} from 'react-native'
import {
  Form,
  Icon,
  Container,
  Content,
  Item,
  Input,
  StyleProvider,
  Label,
  CardItem,
  Card,
  Button,
  Right,
} from "native-base";
import {notifyUser, validateMobileNo} from '../helper/index'
import {createNewStaff, getALlStaffs} from "../CallApi"

const CreateStaff = () => {
  const [staffName, setStaffName] = useState('')
  const [mobileNo, setMobileNo] = useState(null)
  const [disable, setDisable] = useState(false)

  const addNewStaff = async ()=>{
    setDisable(true)
    if(validate()){
          const body = {
            name : staffName,
            mobile : mobileNo
          }
          await createNewStaff(body)
          setStaffName('')
          setMobileNo(null)
          setDisable(false)
          // const staffs = await getALlStaffs()
          // console.log(`.>>>>>>>>>>>>>>>>..staffs `, staffs)
        }
  }

  const validate = () => {
    let validateFlag = true
    if(!staffName){
      validateFlag = false;
      notifyUser(`Staff Name is required`)
      return validateFlag
    }
    if(!validateMobileNo(mobileNo)){
      validateFlag = false;
      notifyUser(`Enter a Valid Mobile Number`)
      return validateFlag
    }
    return validateFlag
  }
  return (
    <Container style = {{marginTop : 50, padding : 10, display : 'flex' }}>
      <Content>
        <Card>
          <CardItem>
            <Icon name="md-arrow-back" />
            <Item>
              <Label style = {{fontWeight : 'bold', fontSize : 20}}>Add Staff</Label>
            </Item>
          </CardItem>
        <CardItem>
        <Item floatingLabel>
          <Label>Enter Staff Full Name</Label>
          <Input
            value ={staffName}
            onChangeText = {(value) => setStaffName(value)}
            underline
          />
        </Item>
        </CardItem>
        <CardItem>

        <Item floatingLabel>
          <Label>{'Mobile Number'}</Label>
          <Input
                value={mobileNo}
                onChangeText = {(value) => setMobileNo(value)}
                maxLength={10}
                keyboardType={'numeric'}
                underline
          />
        </Item>
        </CardItem>
          <Button
            delayPressIn={0}
            androidRippleColor="white"
            block
            style={{margin: 10, padding : 10, backgroundColor : '#0065fe'}}
            title="Submit"
            onPress={(e) => {
              addNewStaff()
            }}
            disabled={disable}
          >
            <Text style={{color: '#FFFFFF', fontSize: 16}}>Continue</Text>
            <Right><Icon name="md-arrow-forward" /></Right>
          </Button>
        </Card>
      </Content>
    </Container>
  );
};

export default CreateStaff;
