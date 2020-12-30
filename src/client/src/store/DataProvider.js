import CompanyProvider from './company'
import UserProvider from './user'
import VenueProvider from './venue'
import ShowProvider from './show'

const DataProvider = ({children}) => {
  return(
    <CompanyProvider>
      <UserProvider>
        <VenueProvider>
          <ShowProvider>
            { children }
          </ShowProvider>
        </VenueProvider>
      </UserProvider>
    </CompanyProvider>
  )
}

export default DataProvider