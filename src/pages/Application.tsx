import React, { useState } from 'react';
// 使用 Ant Design 风格
import FormRender from 'form-render/lib/antd';
// 使用 Fusion 风格
// import FormRender from 'form-render/lib/fusion';
// import '@alifd/next/dist/next.min.css';
import { Button } from 'antd';

let schema = {};
const schema2 = {
  properties: {
    cmd: {
      description: 'Commands to run in the container',
      items: {
        type: 'string',
      },
      title: 'cmd',
      type: 'array',
    },
    cpu: {
      description:
        'Number of CPU units for the service, like `0.5` (0.5 CPU core), `1` (1 CPU core)',
      title: 'cpu',
      type: 'string',
    },
    env: {
      description: 'Define arguments by using environment variables',
      items: {
        properties: {
          name: {
            description: 'Environment variable name',
            title: 'name',
            type: 'string',
          },
          value: {
            description: 'The value of the environment variable',
            title: 'value',
            type: 'string',
          },
          valueFrom: {
            description: 'Specifies a source the value of this var should come from',
            properties: {
              secretKeyRef: {
                description: "Selects a key of a secret in the pod's namespace",
                properties: {
                  key: {
                    description: 'The key of the secret to select from. Must be a valid secret key',
                    title: 'key',
                    type: 'string',
                  },
                  name: {
                    description: "The name of the secret in the pod's namespace to select from",
                    title: 'name',
                    type: 'string',
                  },
                },
                required: ['name', 'key'],
                title: 'secretKeyRef',
                type: 'object',
              },
            },
            required: ['secretKeyRef'],
            title: 'valueFrom',
            type: 'object',
          },
        },
        required: ['name'],
        type: 'object',
      },
      title: 'env',
      type: 'array',
    },
    image: {
      description: 'Which image would you like to use for your service\n+short=i',
      title: 'image',
      type: 'string',
    },
    port: {
      default: 80,
      description: 'Which port do you want customer traffic sent to\n+short=p',
      title: 'port',
      type: 'integer',
    },
  },
  required: ['image', 'port'],
  type: 'object',
};

function Demo() {
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);

  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    if (valid.length > 0) {
      alert(`校验未通过字段：${valid.toString()}`);
    } else {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  function onMouseClick() {
    setData(schema2);
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <button onClick={onMouseClick}>Show Form Data</button>
      <FormRender
        schema={schema}
        formData={formData}
        onChange={setData}
        onValidate={setValid}
        displayType="column" // 详细配置见下
      />
      <Button onClick={onSubmit}>提交</Button>
    </div>
  );
}

export default Demo;
