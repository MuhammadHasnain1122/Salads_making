import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';

// GET request handler
export async function GET(request, { params }) {
  const response = await getData(params?.resource);

  return NextResponse.json(
    response ? response : { error: "Unknown resource" },
    { status: response ? 200 : 404 }
  );
}

// POST request handler
export async function POST(request, { params }) {
  const { resource } = params;
  const action = saveData; // Always use saveData

  const body = await request.json();

  await action(resource, [body]); // Wrap body in an array and perform the saveData action

  return NextResponse.json(
    { message: "Data successfully saved" },
    { status: 200 }
  );
}

// Functions

const getData = async (resource) => {
  try {
    const dataBuffer = await readFile('./src/data/savedData.json');
    const data = JSON.parse(dataBuffer.toString());

    return resource && resource !== 'reset' ? data[resource] : data;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

const saveData = async (resource, newData) => {
  try {
    const dataBuffer = await readFile('./src/data/savedData.json');
    const data = JSON.parse(dataBuffer.toString());

    if (!Object.keys(data).includes(resource)) {
      data[resource] = [];
    }

    const resourceData = data[resource];

    newData.forEach(item => {
      let existingItem = resourceData.find(i => i.id === item.id);

      if (existingItem) {
        Object.assign(existingItem, item);
      } else {
        const newId = Math.max(...resourceData.map(i => i.id)) + 1;
        const newItem = { id: newId, ...item };
        resourceData.push(newItem);
      }
    });

    await writeFile('./src/data/savedData.json', JSON.stringify(data, null, "\t"));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

const resetSavedData = async () => {
  await writeFile(`./src/data/savedData.json`, JSON.stringify({}));
};
