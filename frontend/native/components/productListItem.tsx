import { Text } from './ui/text';
import { Card } from './ui/card';
import { Image } from './ui/image';
import { Heading } from './ui/heading';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

export default function ProductList({ product }: { product: any }) {
    return(
        <Link href={{
            pathname:`/product/[id]`,
            params: { id: product.id}
        }} asChild>
            <Pressable className='flex-1'>
                <Card className="p-5 rounded-lg flex-1">
                <Image
                    source={{
                    uri: product.image,
                    }}
                    className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
                    alt={`${product.name} image`}
                    resizeMode='contain'
                />
                <Text className="text-sm font-normal mb-2 text-typography-700">
                    {product.name}
                </Text>
                    <Heading size="md" className="mb-4">
                    ${product.price}
                    </Heading>
                </Card>
            </Pressable>
        </Link>
    )
  }