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
    paddingVertical: 15,
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
  detail: {
    flexDirection: 'row',
  },

  // customer list
  customerListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    marginTop: 20,
    marginHorizontal: 10,
    borderColor: '#bebebe',
    borderRadius: 15,
  },
  customerListTitle: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7a7a7a',
  },
  customerListText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 20,
    paddingLeft: 20,
  },
  customerListIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  addCustomerButton: {
    bottom: 20,
    right: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppTheme.colors.primary,
  },
  buttonAddCusText: {
    fontSize: 30,
    color: '#fff',
  },
  // transaction list
  transactionListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderWidth: 1,
    borderColor: '#bebebe',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  transactionListDetail: {
    flex: 1,
  },
  transactionListSubsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionListSubText: {
    fontSize: 14,
    color: '#000',
    paddingRight: 10,
    fontWeight: 'bold',
  },
  transactionListText: {
    fontSize: 14,
    color: '#000',
    paddingRight: 10,
  },
  transactionListCancelText: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  transactionListPriceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionListPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppTheme.colors.primary,
  },
  generalContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,

  },
  detailTransactionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppTheme.colors.primary,
    marginBottom: 10,
  },
  detail: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailTransText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7a7a7a',
  },
  detailServiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 16,
  },
  serviceQuantityText: {
    fontSize: 16,
    color: '#7a7a7a',
    fontWeight: 'bold',
  },
  detailServiceLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  signOutButton: {
    width: '98%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.primary,
    borderRadius: 5,
    marginTop: 20,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  customerDetail: {
    flexDirection: 'row',
  },
  customerDetailText: {
    frontSize: 18,
  },
  addTransactionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    borderShadowColor: '#000',
    paddingHorizontal: 10,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceListContainer: {
    width: '100%',
    paddingVertical: 5,
  },

  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  serviceCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#FFB88F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  serviceCircleSelected: {
    borderColor: '#FFB88F',
    backgroundColor: '#EFB88F',
  },

  serviceName: {
    fontSize: 14,
    color: '#777',
  },

  serviceDetail: {
    marginLeft: 28,
    marginBottom: 10,
  },

  serviceActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityButton: {
    width: 30,
    height: 28,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityButtonText: {
    fontSize: 16,
    color: '#555',
  },

  quantityNumber: {
    width: 32,
    height: 28,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityText: {
    fontSize: 13,
    color: '#333',
  },

  executorButton: {
    width: 145,
    height: 32,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },

  executorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  executorText: {
    color: '#777',
    fontSize: 13,
  },

  executorSelectedText: {
    color: '#333',
  },

  servicePrice: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },

  servicePriceValue: {
    color: '#EF506B',
    fontWeight: 'bold',
  },
});

export default Styles;