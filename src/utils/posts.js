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

function generatePost(idOrData) {
    let id, inputData = {};

    // 判断传入的是 ID 还是数据对象
    if (typeof idOrData === 'object') {
        id = idOrData.id || Math.floor(Math.random() * 10000) + 1;
        inputData = idOrData;
    }
    else {
        id = idOrData || Math.floor(Math.random() * 10000) + 1;
    }

    // 生成基础数据
    const baseContent = inputData.content || generateRandomContent();
    const baseData = {
        id,
        author: getRandomElement(names),
        date: generateRandomDate(),
        title: `${getRandomElement(titlePrefixes)}${getRandomElement(topics)}`,
        description: baseContent.substring(0, 50) + '...',
        content: baseContent
    };

    // 合并传入的数据和基础数据，优先使用传入的数据
    return {
        ...baseData,
        ...inputData,
        // 确保 id 始终存在
        id: id
    };
}

function generatePosts(limitOrData = 100) {
    // 如果传入的是数组，则使用数组中的数据生成文章
    if (Array.isArray(limitOrData)) {
        return limitOrData.map(data => generatePost(data));
    }

    // 如果传入的是数字，则生成指定数量的随机文章
    const limit = typeof limitOrData === 'number' ? limitOrData : 100;
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