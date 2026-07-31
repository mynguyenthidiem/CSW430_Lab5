import { DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EF506B',
  },
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: AppTheme.colors.primary,
    marginBottom: 50,
  },
  input: {
    width: '80%',
    backgroundColor: '#eee',
    marginBottom: 15,
  },
  button: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  // header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: AppTheme.colors.primary,
  },

  accountName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  backContainer: {
    backgroundColor: AppTheme.colors.primary,
  },

  icon: {
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  // home
  homeContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  homeImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  serviceItem: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },

  servicePrice: {
    fontSize: 16,
    color: '#888',
  },
  serviceGroup: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingTop: 10,
  },

  nameLable: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  nameInput: {
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 16,
    backgroundColor: '#f2f2f7',
  },
  addButton: {
    alignSelf: 'center',
    backgroundColor: AppTheme.colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginTop: 20,
    width: '100%',
  },
  
  detailContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  detailText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 5,
  },
  detail:{
    flexDirection: 'row',
  },
});

export default Styles;