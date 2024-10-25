
import { StyleSheet } from "react-native";

const HomeStyle = StyleSheet.create({
  
  container: {

        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#007BFF',
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
        
      },
      navbar: {
        flexDirection: 'column',
        justifyContent: 'flex-start', 
        width: '100%',
        padding: 10,
        backgroundColor: 'skyblue', 
        borderTopWidth: 1,
        borderTopColor: 'blue',
      },
      navButton: {
        paddingLeft:10,
        paddingRight:2,
        padding: 10,
        margin:5,
        backgroundColor: '#007BFF', // Button background color
        borderRadius: 5,
      },
      navButtonText: {
        color: '#fff', 
        fontSize: 16,

      },
});

export default HomeStyle;
