import React, { useCallback, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import { Button, Input, Progress } from '@chakra-ui/react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { createArticleFormSchema } from '@/utils/validationSchema';
import { createArticle, getLocations } from '@/services/common';
import { useHistory } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import { debounce } from 'lodash';
const CustomFormError = (msg) => {
  return <span className="text-[8px] leading-[10px] text-red-500">{msg}</span>;
};

interface Props {
  name: string;
  label: string;
  placeholder?: string;
}

const initialValues = {
  keyword: '',
  title: '',
};

const FormInput = ({ name, label, placeholder = '' }: Props) => {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors } }) => {
        return (
          <div className="flex gap-[5px]">
            <label
              htmlFor="keyword"
              className="text-grey-700 my-2 font-bold min-w-[200px]"
            >
              {label}
            </label>
            <div className="flex flex-col w-full gap-2">
              <Input
                placeholder={placeholder}
                {...field}
                className="px-4 py-3"
              />
              <ErrorMessage name={name} render={CustomFormError} />
            </div>
          </div>
        );
      }}
    </Field>
  );
};
function CreateSimple() {
  const history = useHistory();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  const fun = useCallback(async (value: string, callback: any) => {
    setIsLoadingLocations(true);
    const res = await getLocations(value);
    setIsLoadingLocations(false);
    callback(res.data.locations);
  }, []);

  const handler = debounce(fun, 1000);
  const submitHandler = async (values) => {
    let newValues = { ...values, location: selectedLocation };
    if (!selectedLocation) {
      return;
    }
    await createArticle(newValues);
    history.push('/dashboard');
  };
  return (
    <div className="w-full h-screen bg-grey-200 text-grey-800">
      <div className="w-full h-full flex flex-col gap-5 p-4 border-2 ">
        <h1 className="font-bold text-3xl">Create an article</h1>
        <div className="flex w-full shadow-sm mx-auto bg-white p-8 rounded-md">
          <Formik
            initialValues={initialValues}
            validationSchema={createArticleFormSchema}
            onSubmit={submitHandler}
          >
            {(props) => (
              <Form className="w-full">
                <div className="flex w-full flex-col gap-2">
                  <FormInput
                    name="keyword"
                    label="Keyword"
                    placeholder="Post keyword, you want in your article"
                  />
                  <FormInput
                    name="title"
                    label="Title"
                    placeholder="Title for your article (optional)"
                  />

                  <Field name={'location'}>
                    {({
                      field: { onChange },
                      form: { touched, errors, values },
                    }) => {
                      console.log(onChange, values);
                      return (
                        <div className="flex gap-[5px]">
                          <label
                            htmlFor="keyword"
                            className="text-grey-700 my-2 font-bold min-w-[200px]"
                          >
                            Location
                          </label>
                          <AsyncSelect
                            className="min-w-[500px]"
                            components={{
                              Option: (props: any) => {
                                return (
                                  <React.Fragment>
                                    <components.Option {...props}>
                                      <div className="flex">
                                        <div>{props.data.name}</div>
                                      </div>
                                    </components.Option>
                                  </React.Fragment>
                                );
                              },
                            }}
                            //@ts-ignore
                            loadOptions={handler}
                            isLoading={isLoadingLocations}
                            cacheOptions={true}
                            getOptionValue={(option: any) => {
                              return option.name;
                            }}
                            getOptionLabel={(option: any) => option.name}
                            onChange={(val: any) => {
                              console.log(val);
                              setSelectedLocation(val.name);
                            }}
                            placeholder="Location specifity for your article"
                          />
                        </div>
                      );
                    }}
                  </Field>
                </div>
                {props.isSubmitting ? (
                  <Progress
                    value={60}
                    className="mt-10"
                    animation={'ease-in-out'}
                    isIndeterminate
                    sx={{
                      div: {
                        background:
                          'linear-gradient(to right, transparent 0%,#57d3c7 50%, transparent 100%)',
                      },
                    }}
                  />
                ) : (
                  <Button
                    className="h-[44px] w-[180px] py-3 bg-primary-500 text-white mt-6 text-md"
                    isLoading={props.isSubmitting}
                    type="submit"
                    leftIcon={<AiOutlineFileAdd />}
                    variant="primary"
                  >
                    Create Article
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreateSimple;
