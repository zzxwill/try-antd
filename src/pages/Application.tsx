import React, { useState } from 'react';
// 使用 Ant Design 风格
import FormRender from 'form-render/lib/antd';
// 使用 Fusion 风格
// import FormRender from 'form-render/lib/fusion';
// import '@alifd/next/dist/next.min.css';
import { Button } from 'antd';

const schema = {
  type: 'object',
  required: ['image', 'port'],
  properties: {
    cmd: {
      title: 'cmd',
      description: 'Commands to run in the container',
      type: 'array',
      items: {
        type: 'string',
      },
    },
    env: {
      title: 'env',
      description: 'Define arguments by using environment variables',
      type: 'array',
      items: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            title: 'name',
            description: 'Environment variable name',
            type: 'string',
          },
          value: {
            title: 'value',
            description: 'The value of the environment variable',
            type: 'string',
          },
          valueFrom: {
            title: 'valueFrom',
            description: 'Specifies a source the value of this var should come from',
            type: 'object',
            required: ['secretKeyRef'],
            properties: {
              secretKeyRef: {
                title: 'secretKeyRef',
                description: "Selects a key of a secret in the pod's namespace",
                type: 'object',
                required: ['name', 'key'],
                properties: {
                  name: {
                    title: 'properties',
                    description: "The name of the secret in the pod's namespace to select from",
                    type: 'string',
                  },
                  key: {
                    title: 'key',
                    description: 'The key of the secret to select from. Must be a valid secret key',
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
    image: {
      title: 'image',
      description: 'Which image would you like to use for your service\n+short=i',
      type: 'string',
    },
    port: {
      title: 'port',
      description: 'Which port do you want customer traffic sent to\n+short=p',
      type: 'integer',
      default: 80,
    },
    cpu: {
      title: 'cpu',
      description:
        'Number of CPU units for the service, like `0.5` (0.5 CPU core), `1` (1 CPU core)',
      type: 'string',
    },
  },
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

  return (
    <div style={{ maxWidth: 600 }}>
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
