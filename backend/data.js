import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Ewer',
            email: 'ad@exaple.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
            isSeller: true,
            seller: {
                name:'Pan',
                logo: '/images/p8.jpg',
                description: 'best price',
                rating: 4.5,
                numReviews: 150,
            },
        },
        {
            name: 'Bob',
            email: 'ad23@exaple.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
        {
            name: 'Bob',
            email: 'adm@test.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
            seller: {
                name:'Bob',
                logo: '/images/p9.jpg',
                description: 'best products',
                rating: 4,
                numReviews: 50,
            },
        },
    ],
    products:[
        {
            
            name:'Eletronic Part',
            category:'Part',
            image:'/images/p1.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Parasonic',
            rating: 4.5,
            numReviews: 10,
            description: 'Good product',
        },
        {
            
            name:'Eletronic Part 2',
            category:'Part',
            image:'/images/p2.jpg',
            price: 100,
            countInStock: 20,
            brand: 'Parasonic 1',
            rating: 4.0,
            numReviews: 10,
            description: 'Good product',
        },
        {
            
            name:'Eletronic Part 3',
            category:'Part',
            image:'/images/p3.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Parasonic',
            rating: 3.5,
            numReviews: 10,
            description: 'Good product',
        },
        {
          
            name:'Eletronic Part 4',
            category:'Part',
            image:'/images/p4.jpg',
            price: 120,
            countInStock: 25,
            brand: 'Parasonic',
            rating: 2.5,
            numReviews: 10,
            description: 'Good product',
        },
        {
            
            name:'Eletronic Part 5',
            category:'Part',
            image:'/images/p5.jpg',
            price: 120,
            countInStock: 30,
            brand: 'Parasonic',
            rating: 4.0,
            numReviews: 10,
            description: 'Good product',
        },
        {
            
            name:'Eletronic Part 6',
            category:'Part',
            image:'/images/p6.jpg',
            price: 102,
            countInStock: 50,
            brand: 'Parasonic',
            rating: 4.5,
            numReviews: 10,
            description: 'Good product',
        },
    ],
};

export default data;