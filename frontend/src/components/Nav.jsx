import { Link, NavLink } from 'react-router-dom'

const Nav = () => {
    const styles = ({isActive}) => {
        console.log(isActive)
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            backgroundColor: isActive ? '#6ca1fc' : '#bedbff'
        }
    }

  return (
    <nav className='bg-gray-100 flex gap-10 justify-center p-4 rounded-xl'>

        <div className="flex gap-10 justify-center p-4 rounded-xl">
            <Link to="/" className={`p-2 rounded-xl bg-green-200`}>
                Home
            </Link>
        </div>

        <div className='flex gap-10 justify-center p-4 rounded-xl'>
            <NavLink to="/second" style={styles} className={`p-2 rounded-xl`}>
                Second Degree Linear Equation
            </NavLink>
            <NavLink to="/third" style={styles} className={`p-2 rounded-xl`}>
                Third Degree Linear Equation
            </NavLink>
        </div>
    </nav>
  )
}

export default Nav