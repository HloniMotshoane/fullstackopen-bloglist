const listHelper = require('../utils/list_helper');
const { test, describe } = require('@jest/globals');
const assert = require('assert');

describe('dummy', () => {
    test('returns one', () => {
        const result = listHelper.dummy([]);
        assert.strictEqual(result, 1);
    });
});

describe('totalLikes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ];

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        assert.strictEqual(result, 5);
    });

    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422b3b71b54a676234d17f9',
            title: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live',
            author: 'Martin Fowler',
            url: 'https://martinfowler.com/bliki/CodeAsIfTheGuyMaintainingYourCode.html',
            likes: 10,
            __v: 0
        }
    ];

    test('when list has multiple blogs, equals the sum of likes', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs);
        assert.strictEqual(result, 15);
    });
});

describe('favoriteBlog', () => {
    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422b3b71b54a676234d17f9',
            title: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live',
            author: 'Martin Fowler',
            url: 'https://martinfowler.com/bliki/CodeAsIfTheGuyMaintainingYourCode.html',
            likes: 10,
            __v: 0
        }
    ];

    test('when list has multiple blogs, returns the blog with most likes', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs);
        assert.deepStrictEqual(result, {
            _id: '5a422b3b71b54a676234d17f9',
            title: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live',
            author: 'Martin Fowler',
            url: 'https://martinfowler.com/bliki/CodeAsIfTheGuyMaintainingYourCode.html',
            likes: 10,
            __v: 0
        });
    });
});

describe('mostBlogs', () => {
    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422b3b71b54a676234d17f9',
            title: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live',
            author: 'Martin Fowler',
            url: 'https://martinfowler.com/bliki/CodeAsIfTheGuyMaintainingYourCode.html',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422c3b71b54a676234d17f9',
            title: 'Refactoring: Improving the Design of Existing Code',
            author: 'Martin Fowler',
            url: 'https://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0201485672',
            likes: 7,
            __v: 0
        }
    ];

    test('returns author with most blogs', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs);
        assert.deepStrictEqual(result, { author: 'Martin Fowler', blogs: 2 });
    });
});

describe('mostLikes', () => {
    const listWithMultipleBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422b3b71b54a676234d17f9',
            title: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live',
            author: 'Martin Fowler',
            url: 'https://martinfowler.com/bliki/CodeAsIfTheGuyMaintainingYourCode.html',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422c3b71b54a676234d17f9',
            title: 'Refactoring: Improving the Design of Existing Code',
            author: 'Martin Fowler',
            url: 'https://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0201485672',
            likes: 7,
            __v: 0
        }
    ];

    test('returns author with most likes', () => {
        const result = listHelper.mostLikes(listWithMultipleBlogs);
        assert.deepStrictEqual(result, { author: 'Martin Fowler', likes: 17 });
    });
});