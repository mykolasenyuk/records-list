import {Suspense, useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Dna } from  'react-loader-spinner'
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import RecordsList from "./views/RecordsList";
export default function App() {

  return (
      <>
          <Suspense fallback={
              <Dna
              visible={true}
              height="150"
              width="150"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
          />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login/>} />
            <Route path="/records" element={<RecordsList />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
          </Suspense>
            <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
      </>
  )
}
