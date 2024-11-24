import { ContentLayout } from '@/components/layouts';
import Button from '@/components/ui/button';
import { CampaignContainer } from '@/components/ui/card';
import { CampaignList } from '@/helpers/dataset';

import { ShieldCheckIcon, BookOpenCheckIcon } from 'lucide-react';

export const LandingRoute = () => {
  return (
    <ContentLayout title="Home Page" description="Dann Charity">
      <div className="background-landing">
        <span className="--1"></span>
        <span className="--2"></span>
        <span className="--3"></span>
        <span className="--4"></span>
        <span className="--5"></span>
      </div>
      <section
        className="relative grid md:grid-cols-2 grid-cols-1 items-center md:mt-20 xl:gap-24 lg:gap-12 mt-4 gap-8 z-1 bg-transparent"
        id="hero"
      >
        <div className="background-landing--hero">
          <span className="--1"></span>
          <span className="--2"></span>
          <span className="--3"></span>
          <span className="--4"></span>
          <span className="--5"></span>
        </div>
        <div className="flex flex-col md:gap-8 gap-2">
          <div className="flex flex-col gap-3">
            <h1 className="font-dancing text-primary font-bold xl:text-6xl lg:text-5xl text-3xl">
              Chung tay góp sức
            </h1>
            <h1 className="ml-12 font-dancing text-primary font-bold xl:text-6xl lg:text-5xl text-3xl">
              Phát triển mầm non
            </h1>
          </div>
          <q className="font-dancing text-xl font-medium text-primary-600">
            Để giúp đỡ trẻ em có cơ hội học tập tốt nhất và phát triển toàn diện
            nhất trong môi trường an toàn, sạch sẽ, vui chơi, học tập. Hãy cùng
            chúng tôi xây dựng một tương lai tươi sáng cho trẻ em Việt Nam.
          </q>
          <Button
            buttonVariant="filled"
            buttonStyled={{
              color: 'primary',
              rounded: 'lg',
              size: 'xxl',
              vPadding: 'md',
              hPadding: 'md',
              responsiveVariants: 'md' as keyof string[],
            }}
            style={{ width: 'fit-content' }}
            className="mt-2 font-dancing "
          >
            Chung tay góp sức
          </Button>
        </div>
        <div className="flex align-center justify-center">
          <div className="w-full h-auto">
            <img
              src="./src/assets/images/illustration/illus_home_1.png"
              alt=""
              className="w-full h-full object-contant"
            />
          </div>
        </div>
      </section>
      <section
        id="welcome-section"
        title="Welcome to DannCharity section"
        className="grid grid-cols-1 md:grid-cols-2 items-center md:gap-24 md:pt-32 md:pb-24 gap-12 py-12"
      >
        <div className="flex flex-col lg:gap-0 gap-8">
          <div className="lg:w-[24rem] lg:h-[24rem] w-100 h-[12rem] bg-primary-100 rounded-xl outline outline-primary-200 outline-[12px] outline-double"></div>
          <div className="lg:-mt-24 px-8 py-4 self-end w-[20rem] h-fit-content bg-primary-100 rounded-xl outline outline-primary-200 outline-[12px] outline-double">
            <ul className="text-gray-900 font-normal list-disc ">
              <li className="text-primary-900">
                Cùng nhau, chúng ta sẽ tạo ra tương lai tươi đẹp cho các em nhỏ
                có hoàn cảnh khó khăn
              </li>
              <li>Trẻ em là những mầm non cùng được chúng ta nuôi dưỡng</li>
              <li>Nuôi dưỡn để giữ các em an toàn khỏi thế giới nguy hiểm</li>
              <li>Chúng tôi đã bước ra ngoài và bắt đầu thay đổi thế giới</li>
              <li>Giữ các em an toàn khỏi chiến tranh, sự vô nhân đạo</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-fit-content font-dancing text-primary font-semibold text-2xl relative ">
              Welcome to DannCharity
            </span>
            <span className="w-32 h-[1px] bg-primary mt-3 md:block hidden"></span>
          </div>
          <h1
            title="Help many children need to help"
            className="text-gray-800 font-semibold text-3xl font-nunito"
          >
            Hãy chung tay cùng chúng tôi giúp đỡ những
            <q className="text-secondary-600 italic">ngôi sao</q> đang muốn được
            tỏa sáng
          </h1>
          <span className="text-gray-700 text-base text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            totam laborum ipsum, possimus earum consequuntur delectus
            exercitationem cumque! Veritatis ea ab, repellendus dicta quisquam
            obcaecati ratione optio perspiciatis quod nihil.
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-2 rounded bg-primary-300">
              <div className="flex gap-2 justify-start items-center md:mb-4 mb-2">
                <ShieldCheckIcon size={32} className="text-primary-700" />
                <span className="capitalize text-xl font-semibold font-nunito text-primary-700">
                  Trách nhiệm
                </span>
              </div>
              <p
                title="description"
                className="text-sm font-normal text-gray-600"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                tempora quia corrupti magni minima cum repellat, sunt,
                cupiditate unde quae aliquam facere possimus eligendi soluta?
                Error cupiditate illum deleniti ab?
              </p>
            </div>
            <div className="p-2 rounded bg-primary-300">
              <div className="flex gap-2 justify-start items-center mb-4">
                <BookOpenCheckIcon size={32} className="text-primary-700" />
                <span className="capitalize text-xl font-semibold font-nunito text-primary-700">
                  Đảm bảo
                </span>
              </div>
              <p
                title="description"
                className="text-sm font-normal text-gray-600"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                tempora quia corrupti magni
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="campaigns"
        className="md:py-16 py-8"
        title="Title's campagin of landing page"
      >
        <div className="flex items-center gap-2">
          <span className="w-fit-content font-dancing text-primary font-semibold text-2xl relative ">
            Các hoàn cảnh quyên góp
          </span>
          <span className="w-32 h-[1px] bg-primary mt-3 md:block hidden"></span>
        </div>
        <h1
          title="Help many children need to help"
          className="text-gray-800 font-semibold text-3xl font-nunito mt-2"
        >
          Những hoàn cảnh cần sự giúp đỡ của các{' '}
          <q className="text-secondary-600 italic">người ương mầm</q> như bạn
        </h1>
        <CampaignContainer campaigns={CampaignList}></CampaignContainer>
      </section>
      <section
        id="aboutUs"
        className="grid md:grid-cols-2 grid-cols-1 items-center md:gap-24 md:pt-32 md:pb-24 gap-12 py-12"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-fit-content font-dancing text-primary font-semibold text-2xl relative ">
              Chúng tôi là ai?
            </span>
            <span className="w-32 h-[1px] bg-primary mt-3 md:block hidden"></span>
          </div>
          <h1
            title="Help many children need to help"
            className="text-gray-800 font-semibold text-3xl font-nunito"
          >
            Sự hộ trợ của bạn là{' '}
            <q className="text-secondary-600 italic">sức mạnh</q> của chúng tôi
          </h1>
          <span className="text-gray-700 text-base text-justify">
            Bí quyết của hạnh phúc nằm ở việc giúp đỡ người khác. Đừng bao giờ
            đánh giá thấp sự khác biệt mà bạn có thể tạo ra trong cuộc sống của
            các em nhỏ đang có mong muốn học tập mà hoàn cảnh không cho phép.
          </span>
          <Button
            buttonVariant="filled"
            buttonStyled={{
              color: 'primary',
              rounded: 'lg',
              size: 'xxl',
              vPadding: 'md',
              hPadding: 'md',
              responsiveVariants: 'md' as keyof string[],
            }}
            style={{ width: 'fit-content' }}
            className="mt-2 font-dancing"
          >
            Tìm hiểu thêm về chúng tôi
          </Button>
        </div>
        <div className="flex flex-col lg:gap-0 gap-8">
          <div className="lg:w-[24rem] lg:h-[24rem] w-100 h-[12rem] bg-primary-100 rounded-xl outline outline-primary-200 outline-[12px] outline-double"></div>
          <div className="lg:-mt-24 px-8 py-4 self-end w-[20rem] h-[20rem] bg-primary-100 rounded-xl outline outline-primary-200 outline-[12px] outline-double"></div>
        </div>
      </section>
    </ContentLayout>
  );
};
