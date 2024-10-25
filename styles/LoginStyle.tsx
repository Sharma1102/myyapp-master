import { StyleSheet } from "react-native";


const LoginStyle = StyleSheet.create({


    container: {
        flex: 1,
      },
      background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      innerContainer: {
        padding: 40,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      input: {
        height: 60,
        width:350,
        borderColor: '#555',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#ffffff',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
      },
      button: {
        backgroundColor: '#008CBA', // a calming blue color
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 16,
        width: 87,
      },
      buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
      },
      error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 12,
      },
      registerButton: {
        marginTop: 20,
        alignItems: 'center',
      },
      registerButtonText: {
        color: '#40E0D0',
        fontSize: 18,
      },
})

export default LoginStyle;