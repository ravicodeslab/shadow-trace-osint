class RiskScorer:
    def calculate(self, findings):
        if not findings:
            return 0
        
        # Calculate: 20 points per leak, capped at 100
        # If you have 2 findings, this will show 40%
        base_score = len(findings) * 20
        
        return min(base_score, 100)

scorer = RiskScorer()