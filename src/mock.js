export const testData = {
  relation: 'and',
  level: 0,
  children: [
    {
      level: 1,
      relation: 'and',
      children: [
        {
          key: 1,
          left: 'a',
          operator: '>',
          right: '123',
          level: 2
        }, {
          key: 4,
          left: 'a',
          operator: '>',
          right: '123',
          level: 2
        }, {
          level: 2,
          relation: 'and',
          children: [
            {
              key: 2,
              left: 'a',
              operator: '>',
              right: '123',
              level: 3
            }, {
              key: 2,
              left: 'a',
              operator: '>',
              right: '123',
              level: 3
            }
          ]
        }
      ]
    }, {
      key: 2,
      left: 'a',
      operator: '>',
      right: '123',
      level: 1
    },
  ]
}

