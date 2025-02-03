const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十', '郑十一', '王十二'];
const titlePrefixes = ['浅谈', '探索', '深入理解', '解析', '你不知道的', '初学者必看：', '详解', '简析', '全面解读', '入门指南：'];
const topics = ['JavaScript', 'Python', 'Java', 'React', 'Vue', 'Node.js', 'Docker', 'Kubernetes', 'DevOps', '微服务'];
const paragraphs = [
    '在当今快速发展的技术世界中，',
    '随着技术的不断进步，',
    '作为一个开发者，',
    '在实际项目开发中，',
    '通过不断的学习和实践，'
];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate(start = new Date(2020, 0, 1), end = new Date()) {
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
}

function generateRandomContent() {
    const contentParagraphs = [];
    const paragraphCount = Math.floor(Math.random() * 3) + 2; // 2-4段

    for (let i = 0; i < paragraphCount; i++) {
        contentParagraphs.push(getRandomElement(paragraphs) +
            '我们需要关注' + getRandomElement(topics) + '的发展动向。' +
            '这不仅能提高我们的技术水平，还能帮助我们更好地理解技术发展趋势。');
    }

    return contentParagraphs.join('\n\n');
}

// 生成单个文章
function generatePost(id) {
    const title = `${getRandomElement(titlePrefixes)}${getRandomElement(topics)}`;
    const content = generateRandomContent();

    return {
        id,
        author: getRandomElement(names),
        date: generateRandomDate(),
        title,
        description: content.substring(0, 50) + '...',
        content
    };
}

// 生成指定数量的文章
function generatePosts(limit = 100) {
    const posts = [];
    for (let i = 1; i <= limit; i++) {
        posts.push(generatePost(i));
    }
    return posts;
}

module.exports = {
    generatePosts,
    generatePost
};