import React from "react";
import { useNavigate } from "react-router-dom";
import usePlans from "../../hooks/Lending/usePlans";
import PlanCard from "../../components/landing/pay/plancard";
import LandingLayout from "./../../layouts/LandingLayout";

export default function LandingPayPage() {
  const plans = usePlans();
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  const handleTrialClick = () => {
    navigate("/toss"); // 중간 페이지로 이동
  };

  return (
    <LandingLayout>
      <div className="pay-container">
        <div className="content-left">
          <h1 className="title">제품 및 가격안내</h1>
          <img
            src="/images/Landing/payyb.png"
            alt="제품 이미지"
            className="product-image"
          />
          <p className="subtitle">
            규모, 환경, 예산에 맞게 도입할 수 있는 다양한 유형의 제품을 합리적인
            가격으로 제공합니다.
          </p>
          <div className="footer">
            <p className="plan-text">100% 무료 플랜을 사용해 보세요</p>
            <div className="trial-container">
              <p className="trial-text">
                무료 플랜을 시작하고 한 달에 10번의 조회를 완전 무료로 수행해
                보세요!
              </p>
              <button className="trial-button" onClick={handleTrialClick}>
                무료 체험
              </button>
            </div>
            <div className="payment-methods">
              <p>결제 수단</p>
              <div className="payment-images">
                <img src="/images/Landing/payment.png" alt="결제 수단" />
                <img src="/images/Landing/paymentbottom.png" alt="결제 수단" />
              </div>
            </div>
          </div>
        </div>
        <div className="plans">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </LandingLayout>
  );
}
