import {
    SkeletonPage,
    Layout,
    SkeletonBodyText,
    SkeletonDisplayText,
    Card,
    BlockStack,
    } from '@shopify/polaris';

function PageSkeleton() {
    return (
        <SkeletonPage primaryAction>
        <Layout>
            <Layout.Section>
                <BlockStack gap="400">
                <Card>
                <SkeletonBodyText />
            </Card>
            <Card >
                <BlockStack gap="400">
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText />
                </BlockStack>
            </Card>
            <Card >
                <BlockStack gap="400">
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
                </BlockStack>
            </Card>
                </BlockStack>
            </Layout.Section>
            <Layout.Section variant="oneThird">
                <BlockStack gap="500">
                <Card>
                <BlockStack gap="400">
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText lines={2} />
                <SkeletonBodyText lines={1} />
                </BlockStack>
            </Card>
            <Card>
                <BlockStack gap="400">
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText lines={2} />
                     <SkeletonBodyText lines={2} />

                </BlockStack>
            </Card>
                </BlockStack>
            </Layout.Section>
        </Layout>
        </SkeletonPage>
    );
}

  export default PageSkeleton;
