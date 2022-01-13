import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Linking } from 'react-native';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
 
export default class IngredientTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Ingredient', 'Quantity', 'Buy'],
      tableData: []
    }
  }

  generate_table_data = () => {
    let ings = this.props.ingredients
    let ll = []
    for(let i of ings){
      let o = []
      o.push(i.name) 
      o.push(i.quantity)
      o.push(i.purchaseLink)
      ll.push(o)
    }
    return ll 
  }
 
  render() {
    // console.log(this.props.ingredients)
    const state = this.state;

    let table_data = this.generate_table_data()

    const element = (data, index) => (
      <TouchableOpacity onPress={() => Linking.openURL(data)}>
          <Text style={{marginLeft: 10, color: "#1e4f74", textDecorationLine: 'underline'}}>Click Here</Text>
      </TouchableOpacity>
    );

    return (
      <View style={{marginVertical: 20}}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            table_data.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 2 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  row: { flexDirection: 'row'}
});