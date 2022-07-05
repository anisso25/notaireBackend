'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Categories',
			[
				{
					id: 1,
					name: 'وكالة عامة',
					icon: 'https://cdn4.iconfinder.com/data/icons/general-office/91/General_Office_03-512.png',
				},
				{
					id: 2,
					name: 'وكالة سيارة',
					icon: 'https://cdn3.iconfinder.com/data/icons/car-icons-front-views/480/Sports_Car_Front_View-512.png',
				},
				{
					id: 3,
					name: 'وكالة خاصة - فريضة',
					icon: 'https://cdn0.iconfinder.com/data/icons/seo-outline-black-part-2/128/social_network_share_seo_team_group_relation_users-512.png',
				},
				{
					id: 4,
					name: 'عقد إيجار سكني',
					icon: 'https://cdn4.iconfinder.com/data/icons/aami-web-internet/64/aami19-57-512.png',
				},
				{
					id: 5,
					name: 'عقد إيجار تجاري',
					icon: 'https://cdn3.iconfinder.com/data/icons/shopping-28/32/storefront-256.png',
				},
				{
					id: 6,
					name: 'عقد بيع عقار',
					icon: 'https://cdn4.iconfinder.com/data/icons/real-estate-92/64/home_building_real_estate_property_billboard_sale-256.png',
				},
				{
					id: 7,
					name: 'عقد بيع سفينة نزهة',
					icon: 'https://cdn2.iconfinder.com/data/icons/summer-sale-2-line/64/summer_sale-42-256.png',
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Categories', null, {});
	},
};
