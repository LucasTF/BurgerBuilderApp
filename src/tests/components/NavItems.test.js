import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavItems from '../../components/Navigation/NavItems';
import { NavLink } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('<NavItems />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavItems />);
	});

	it('should render two <NavItems /> elements if not authenticated', () => {
		expect(wrapper.find(NavLink)).toHaveLength(3);
	});

	it('should render four <NavItems /> elements if authenticated', () => {
		wrapper.setProps({ isAuth: true });
		expect(wrapper.find(NavLink)).toHaveLength(4);
	});

	it('should NOT render a logout <NavLink /> when not authenticated', () => {
		expect(
			wrapper.contains(
				<NavLink to={process.env.PUBLIC_URL + '/logout'}>
					Logout
				</NavLink>
			)
		).toEqual(false);
	});
});
