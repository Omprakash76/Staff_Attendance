/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Button, Card, Icon, Item, Label, Container, Content} from 'native-base'
import {createStaffAttendance, updateStaffLeaveStatus, getALlStaffs} from "../CallApi";
import {ATTENDANCE_TYPE} from '../constants'
import {get, isEmpty} from "lodash"
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

class StaffAttendance extends Component {
    constructor() {
        super();
        this.state = {
            staffs : [],
            totalPresent : 0,
            totalHalfDay : 0,
            totalAbsent : 0,
            selectedDate : moment().format('DD/MM/YYYY')
        }
    }
    componentDidMount() {
        this.getAllStaffs(this.state.selectedDate)
    }
    calculateAttendanceStatus = (staffs) => {
        let totalPresent = 0
        let totalHalfDay = 0
        let totalAbsent = 0
        console.log(`.>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..calculateAttendanceStatus  `)

        if(!isEmpty(staffs)){
            for(let staff of staffs){
                console.log(`.>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..STAFF  `, staff)
                if(get(staff, 'attendance[0].attendance_status', '')===ATTENDANCE_TYPE.PRESENT){
                    totalPresent+=1
                }else  if(get(staff, 'attendance[0].attendance_status', '')===ATTENDANCE_TYPE.HALF_DAY){
                    totalHalfDay+=1
                }else if (get(staff, 'attendance[0].attendance_status', '')===ATTENDANCE_TYPE.ABSENT){
                    totalAbsent+=1
                }
            }
            this.setState({
                totalPresent,
                totalHalfDay,
                totalAbsent
            })
        }
    }

    updateOrCreateAttendance = async (data, status)=>{
        console.log(`....................updateOrCreateAttendance`, data)
            const body = {
                staff_id : data._id,
                attendance_status : status,
                attendance_date : moment(this.state.selectedDate).format('YYYY-MM-DD')
            }
            await createStaffAttendance(body)

        // setTimeout(async ()=>{
            await this.getAllStaffs(this.state.selectedDate)
        // }, 2000)
  }
  getAllStaffs = async(date) => {
        date = moment(date).format('YYYY-MM-DD')
      const res = await getALlStaffs(date)
      const staffs = get(res, 'data', [])
      console.log(`.>>>>>>>>>>>>>>>>...sraffs`, JSON.stringify(staffs))

      if(!isEmpty(staffs)){
          this.setState({
              staffs : staffs
          })
          this.calculateAttendanceStatus(staffs)
      }
  }
  onSelectDate = async (date)=>{
        console.log(`.........................date`,date)
        this.setState({
            selectedDate : date
        })
      await this.getAllStaffs(date)
  }
  render() {
      console.log(`........................render  .staffs`,this.state.staffs)
      return (
        <Container>
            <Content>
                <View style = {{ backgroundColor: '#0065fe'}}>
                    <Text style = {{fontWeight : 'bold', margin :20, fontSize : 20}} >Attendance</Text>
                </View>
                <Card>
                <View style={{display : 'flex', flexDirection : "row"}}>
                    <View style = {styles.boxSimple}>
                       <Text>{'Present(P)'}</Text>
                       <Text>{this.state.totalPresent}</Text>
                    </View>
                    <View style = {styles.boxSimple}>
                        <Text>{'Absent(A)'}</Text>
                        <Text>{this.state.totalAbsent}</Text>
                    </View>
                    <View style = {styles.boxSimple}>
                        <Text>{'Half Day'}</Text>
                        <Text>{this.state.totalHalfDay}</Text>

                    </View>
                </View>
                <DatePicker
                    style={{width: '100%'}}
                    date={this.state.selectedDate}
                    mode="date"
                    format="DD/MM/YYYY"
                    placeholder="Promise to Pay"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => this.onSelectDate(date)}
                />
                <View style = {{marginTop : 20}}>
                    <Text>{`MONTHLY STAFF (${this.state.staffs.length})`}</Text>
                </View>
                {
                    this.state.staffs.map((staff, i)=> {
                        return <Card key = {i}>
                            <View style = {{margin : 10}} >
                                <Text>{`${staff.name}`}</Text>
                            </View>
                            <View style={{display : 'flex', flexDirection: 'row',}}>
                                <Button
                                    delayPressIn={0}
                                    androidRippleColor="white"
                                    block
                                    style={{margin: 10, width : '20%', backgroundColor : get(staff, 'attendance[0].attendance_status', '')===ATTENDANCE_TYPE.PRESENT ? '#63ad11' : '#FFFFFF'}}
                                    title="Submit"
                                    onPress={(e) => {
                                        this.updateOrCreateAttendance(staff, ATTENDANCE_TYPE.PRESENT)
                                    }}
                                >
                                    <Text style={{color: '#000', fontSize: 16}}>Present</Text>
                                </Button>
                            <View>
                            </View>
                                <Button
                                    delayPressIn={0}
                                    androidRippleColor="white"
                                    block
                                    style={{margin: 10, width : '20%', backgroundColor : get(staff, 'attendance[0].attendance_status', '')===ATTENDANCE_TYPE.HALF_DAY ? '#63ad11' :  '#FFFFFF'}}
                                    onPress={(e) => {
                                        this.updateOrCreateAttendance(staff, ATTENDANCE_TYPE.HALF_DAY)
                                    }}
                                >
                                    <Text style={{color: '#000', fontSize: 16}}>Half Day</Text>
                                </Button>
                                <View>
                                </View>
                                <Button
                                    delayPressIn={0}
                                    androidRippleColor="white"
                                    block
                                    style={{margin: 10, width : '20%', backgroundColor : get(staff, 'attendance[0].attendance_status', '')===ATTENDANCE_TYPE.ABSENT ? '#63ad11' : '#FFFFFF'}}
                                    onPress={(e) => {
                                        this.updateOrCreateAttendance(staff, ATTENDANCE_TYPE.ABSENT)
                                    }}
                                >
                                    <Text style={{color: '#000', fontSize: 16}}>Absent</Text>
                                </Button>
                            </View>
                        </Card>

                    })
                }
                </Card>
            </Content>
        </Container>
    );
  };
};

export default StaffAttendance;

const styles = StyleSheet.create({
    boxSimple: {
        backgroundColor: '#fff',
        borderWidth: 0.2,
        borderColor: '#000',
        padding: 10,
        width : '33%',
        justifyContent : 'space-around'
    },
})
