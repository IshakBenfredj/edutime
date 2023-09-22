import { useContext } from 'react';
import images from '../../constants/images';
import './footer.css'
import { Link } from 'react-router-dom'
import UserContext from '../../context/userContext';

const Footer = () => {
	const { user } = useContext(UserContext)

	const thisYear = ()=>{
		let thisDate = new Date();
		return thisDate.getFullYear();
	}
	return (
		<footer>
			<div className="container">
				<div className="logo m-auto">
					<img src={images.whiteLogo} alt="Logo" />
				</div>
				<div className="center links">
					<Link to={user && user !== 'user' && '/addPayment'} className="barid">
						<img src={images.barid} alt="" />
					</Link>
					<div className="rules center">
						<Link to={'/termsAndConditions'}>الشروط والأحكام</Link>
						<Link to={'/privacyPolicy'}>سياسة الخصوصية</Link>
						<Link to={'/platformWork'}>كيف تعمل منصتنا ؟</Link>
						<Link to={'/subscriptionDetails'}>تفاصيل الاشتراك </Link>
						<Link to={'/buySubscription'}>كيف شراء إشتراك في منصة EduTime ؟</Link>
					</div>
					<div className="contact">
						<Link>Sétif, Algérie</Link><br/>
						<Link to={'mailto:edutime19@gmail.com'}>edutime19@gmail.com</Link><br/>
						<Link className='text-left d-block' to={'tel:0556488809'}>0556 48 88 09</Link><br/>
					</div>
				</div>
			</div>
			<div className="copyright">
				جميع الحقوق محفوظة <span>EduTime</span> &copy;<span>{thisYear()}</span>
			</div>
		</footer>
	)
}

export default Footer