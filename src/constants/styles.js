
import { StyleSheet } from 'react-native';
import { colors, shadows } from './palette';

export default StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: "#fff",
    },

    ProfileImg:{
        margin: 5,
        alignContent:"center",
        alignItems: "center",
        width: 130, 
        height: 130, 
        borderRadius: 100,
    },

    FullName:{
        fontSize : 25,
        fontWeight : "bold",
        color : colors.black,
        padding : 5,
      },

    row: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "space-between",
        paddingTop: 10,
    },

    VerticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#909090',
    },
    HorizontalLine:{
        borderBottomColor:  '#909090',
        borderBottomWidth: 1,
        margin : 5,
    },

    SpName:{
        fontSize : 20,
        color : colors.black, 
        marginLeft : 12,
      },
    
    backImage: {
    flex: 1,
    justifyContent: 'center',
    },
    

    
});
