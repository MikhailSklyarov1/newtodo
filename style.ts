import { StyleSheet, Dimensions  } from 'react-native';
const { width } = Dimensions.get('window');
const widthElem = width * 0.8;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#659DBD',
    alignItems: 'center',
    
  },
  
  items: {
    width: widthElem,
    minHeight: 50,
    padding: 10,
    backgroundColor: '#DAAD86',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },

  text: {
    color: '#FFF',
  },

  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 50
  },

  universeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthElem,
  },

  input: {
    flex: 1,
    backgroundColor: '#FFF',
    color: "black",
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },

  inputContainer: {
    marginTop: 80,
  },

  itemContainer: {
    marginTop: 30,
  },

  scroll: {
    marginBottom: 20,
    paddingRight: 10,
  }


});

export default styles;